export type SupplierStatus = "Active" | "In Progress" | "Blocked";

export interface Supplier {
  name: string;
  code: string;
  alias: string;
  id: string;
  address: string;
  contact: string;
  status: SupplierStatus;
}
