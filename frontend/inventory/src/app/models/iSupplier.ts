export interface iSupplier {
  name: String;
  email: String;
  phone: String;
  address: String;
  contactPerson: {
    name: String;
    email: String;
    phone: String;
  };
  isActive: boolean;
  industry: String;
}
