import { GeneralResponse } from '@delightree-task/types';
import { Customer } from '@delightree-task-models/customer.schema';

export interface CustomersPort {
  createCustomer(): Promise<GeneralResponse>;
  updateCustomer(): Promise<GeneralResponse>;
  deleteCustomer(): Promise<GeneralResponse>;
  getCustomer(): Promise<GeneralResponse>;
}
