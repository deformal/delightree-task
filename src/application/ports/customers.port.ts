import { GeneralResponse } from '@delightree-task/types';

export interface CustomersPort {
  createCustomer(): Promise<GeneralResponse>;
  updateCustomer(): Promise<GeneralResponse>;
  deleteCustomer(): Promise<GeneralResponse>;
  getCustomer(): Promise<GeneralResponse>;
}
