# Database Schema Reference

## Design decisions (SQL → NoSQL translation notes)

- **User → Product/Order**: referenced (ObjectId), because users and
  products are independent, growing collections queried on their own.
- **Order → OrderItems**: **embedded** inside the Order document, because
  line items are always read together with their order and never queried
  independently. This is the one place we intentionally "denormalize"
  compared to a SQL join table.
- **StockMovement**: a separate collection (not embedded in Product),
  because it's an append-only history log that grows indefinitely — keeping
  it separate avoids bloating the Product document.

## Collections

### User
| Field | Type | Notes |
|---|---|---|
| name | String | required |
| email | String | required, unique |
| password | String | required, hashed with bcrypt, `select: false` by default |
| role | String enum | `admin` \| `manager` \| `staff` |

### Category
| Field | Type | Notes |
|---|---|---|
| name | String | required, unique |
| description | String | |

### Product
| Field | Type | Notes |
|---|---|---|
| name | String | required |
| sku | String | required, unique |
| description | String | |
| category | ObjectId → Category | required |
| price | Number | required, min 0 |
| quantity | Number | required, min 0 |
| lowStockThreshold | Number | default 10 |
| status | String enum | `active` \| `inactive` |

`isLowStock` is a computed virtual (`quantity <= lowStockThreshold`) — not
stored, always derived, so it's never out of sync.

### Supplier
| Field | Type | Notes |
|---|---|---|
| name | String | required |
| email, phone, address, contactPerson | String | |

### Order
| Field | Type | Notes |
|---|---|---|
| orderNumber | String | required, unique |
| type | String enum | `purchase` \| `sales` |
| supplier | ObjectId → Supplier | required for `purchase` orders (enforce in controller) |
| products | Array of `{ product, quantity, price }` | **embedded** sub-documents |
| totalAmount | Number | required |
| status | String enum | `pending` → `approved` → `shipped` → `delivered` (or `cancelled`) |
| createdBy | ObjectId → User | required |

### StockMovement
| Field | Type | Notes |
|---|---|---|
| product | ObjectId → Product | required |
| quantity | Number | positive = addition, negative = removal |
| type | String enum | `addition` \| `removal` \| `adjustment` |
| reference | String | e.g. order number, or "manual adjustment" |
| createdBy | ObjectId → User | required |

## Key business logic to implement (not just CRUD)

1. **Stock deduction on order**: when a `sales` order status becomes
   `delivered`, decrease each product's `quantity` by the ordered amount and
   create a matching `StockMovement` (type: `removal`, reference: order
   number). Same idea in reverse for `purchase` orders (type: `addition`).
2. **Low stock detection**: computed on read (`quantity <= lowStockThreshold`),
   not stored — see the `isLowStock` virtual on Product.
3. **Not-submitted / low-stock dashboard counts**: aggregate queries
   (`Product.countDocuments({...})`) rather than looping in JS, for
   performance.
