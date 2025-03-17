import { CustomersRepo } from '../../../infra/repository/customers.repo';
import {
  CreateCustomerArgs,
  CustomerOrders,
  DeleteCustomerArgs,
  GetCustomerArgs,
  GetCustomerOrdersArgs,
  UpdateCustomerArgs,
} from 'src/application/dto/customers.dto';
import { Customer } from '../../../domain/customers/customer.entity';
import { GeneralResponse } from '@delightree-task/types';
export class CustomerServices {
  private readonly customerRepo: CustomersRepo = new CustomersRepo();

  async getCustomerOrders(
    args: GetCustomerOrdersArgs,
  ): Promise<CustomerOrders> {
    try {
      const customer_orders = await this.customerRepo.getCustomerOrders(args);
      return customer_orders;
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }

  async getCustomer(args: GetCustomerArgs): Promise<Customer> {
    try {
      const customer = await this.customerRepo.getCustomer(args);
      return customer;
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }

  async createCustomer(args: CreateCustomerArgs): Promise<GeneralResponse> {
    try {
      const customer = await this.customerRepo.getCustomerByEmail({
        email: args.email,
      });
      if (customer)
        throw new Error(`Customer with ${customer.email} already exists`);
      const customer_instance = new Customer(args);
      const res = await this.customerRepo.createCustomer(customer_instance);
      return res;
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }

  async updateCustomer(args: UpdateCustomerArgs): Promise<GeneralResponse> {
    try {
      const customer_id = args.id;
      const customer = await this.customerRepo.getCustomer(args);
      if (!customer)
        throw new Error(`Customer with ${customer_id} was not found`);
      const customer_instance = new Customer(customer);
      customer_instance.updateCustomer(args);
      const res = await this.customerRepo.updateCustomer(customer_instance);
      return res;
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }

  async deleteCustomer(args: DeleteCustomerArgs): Promise<GeneralResponse> {
    try {
      const { id } = args;
      const customer = await this.customerRepo.getCustomer({ id });
      const customer_instance = new Customer(customer);
      return await this.customerRepo.deleteCustomer(customer_instance);
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }
}
