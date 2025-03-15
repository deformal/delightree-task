import { CustomerModel, ICustomer } from '../mongo/schemas/customer.schema';
import {
  GeneralResponse,
  GetCustomerOptionsTypes,
  ResponseMessages,
} from '../../types/types';
import { Customer } from 'src/domain/customers/customer.entity';

export class CustomersRepo {
  private readonly orders_table_name: string = 'orders';
  async createCustomer(customer: Customer): Promise<GeneralResponse> {
    try {
      const customer_model = new CustomerModel(customer);
      await customer_model.save();
      return { message: ResponseMessages.SUCCESS, ok: true };
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }

  async updateCustomer(customer: Customer): Promise<GeneralResponse> {
    try {
      const customer_model = new CustomerModel(customer);
      await customer_model.save();
      return { message: ResponseMessages.SUCCESS, ok: true };
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }

  async deleteCustomer(customer: Customer): Promise<GeneralResponse> {
    try {
      const customer_model = new CustomerModel(customer);
      await customer_model.deleteOne();
      return { message: ResponseMessages.SUCCESS, ok: true };
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }

  async getCustomer(options: GetCustomerOptionsTypes): Promise<ICustomer> {
    try {
      const { id, email } = options;

      if (!id && !email)
        throw new Error('Either id or email is needed to fetch a customer');

      const customer = await CustomerModel.findOne({
        $or: [{ _id: id }, { email: email }],
      }).populate({
        path: 'orders',
        model: 'orders',
      });

      if (!customer)
        throw new Error(`Customer with options ${id ? id : email} not found`);

      return customer;
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }

  async getAllCustomers(): Promise<Array<Customer>> {
    try {
      const customers = await CustomerModel.aggregate<Customer>([
        {
          $lookup: {
            from: this.orders_table_name,
            localField: '_id',
            foreignField: 'customer_id',
            as: 'orders',
          },
        },
      ]);

      if (!customers || customers.length < 1)
        throw new Error(`No customers found`);

      return customers;
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }
}
