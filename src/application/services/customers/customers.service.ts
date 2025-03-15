import { ICustomer } from '@delightree-task-models/customer.schema';
import { CustomersRepo } from '../../../infra/repository/customers.repo';
import { GetCustomerOptionsTypes } from '@delightree-task/types';
export class CustomerServices {
  private readonly customerRepo: CustomersRepo = new CustomersRepo();

  async getAllCustomers(): Promise<Array<ICustomer>> {
    try {
      const get_all_customers = await this.customerRepo.getAllCustomers();
      return get_all_customers;
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }

  async getCustomer(
    customer_options: GetCustomerOptionsTypes,
  ): Promise<ICustomer> {
    try {
      const customer = await this.customerRepo.getCustomer(customer_options);
      return customer;
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }
}
