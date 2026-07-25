# Inventory Management System (MEAN Stack)

A warehouse/inventory tracker: manage products, categories, suppliers, and
purchase/sales orders, with automatic low-stock alerts and role-based access
(Admin / Manager / Staff).

## Tech stack
- **M**ongoDB (Atlas) + Mongoose
- **E**xpress.js
- **A**ngular 17+ (standalone components, Angular Material)
- **N**ode.js
- Auth: JWT + bcrypt

## Repo structure
```
inventory-mean/
├── backend/          # Express + MongoDB API
│   └── src/
│       ├── config/       # DB connection
│       ├── models/       # Mongoose schemas
│       ├── controllers/  # Business logic
│       ├── routes/       # Express routers
│       ├── middleware/   # auth, error handling, validation
│       └── utils/        # helpers (token generation, async wrapper)
└── frontend/         # Angular app
    └── src/app/
        ├── core/         # guards, interceptors, singleton services
        ├── shared/       # reusable components (buttons, loaders, etc.)
        └── features/     # one folder per feature: auth, products, orders...
```

## Getting started (backend)
```bash
cd backend
npm install
cp .env.example .env      # fill in your own MongoDB Atlas URI + JWT secret
npm run dev                # starts on http://localhost:5000
```

## Getting started (frontend)
This repo has the recommended folder layout under `frontend/src/app/`, but
you still need to generate the actual Angular project once:
```bash
cd frontend
npx @angular/cli new . --routing --style=scss --skip-git
ng add @angular/material
```
Then move your components into the matching `core/`, `shared/`, `features/`
folders already set up here.

## Team split (suggested — matches the 4-person plan)
| Dev | Owns |
|---|---|
| Dev 1 | Auth, Users, role middleware, error handling |
| Dev 2 | Products, Categories, Stock/low-stock logic |
| Dev 3 | Suppliers, Orders, stock deduction on order |
| Dev 4 | Angular app shell, routing, all UI components |

## Git workflow
- `main` = always deployable
- One branch per feature: `feature/auth-backend`, `feature/product-crud`, etc.
- Small PRs, daily pulls from `main` to avoid painful merge conflicts
- No direct pushes to `main` — review each other's PRs even briefly

## API conventions (agree on this as a team before coding)
- All responses: `{ success: boolean, data?, message?, errors? }`
- All protected routes require header: `Authorization: Bearer <token>`
- Validation errors return `400` with an `errors` array (field + message)
