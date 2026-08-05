export interface iSupplier {
  _id: String;
  name: String;
  email: String;
  phone: String;
  address: String;
  contactPerson: {
    name: String;
    email: String;
    phone: String;
  };
  industry: String;
  isActive: boolean;
  __v: number;
}
