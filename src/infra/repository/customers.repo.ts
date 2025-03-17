import { CustomerModel } from '../mongo/schemas/customer.schema';
import { GeneralResponse, ResponseMessages } from '../../types/types';
import { Customer } from 'src/domain/customers/customer.entity';
import {
  CustomerOrders,
  GetCustomerArgs,
  GetCustomerByEmail,
  GetCustomerOrdersArgs,
} from 'src/application/dto/customers.dto';

export class CustomersRepo {
  private readonly orders_table_name: string = 'orders';
  async createCustomer(customer: Customer): Promise<GeneralResponse> {
    try {
      const customer_model = new CustomerModel(customer);
      await customer_model.save();
      return { message: ResponseMessages.SUCCESS, success: true };
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
      return { message: ResponseMessages.SUCCESS, success: true };
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
      return { message: ResponseMessages.SUCCESS, success: true };
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }

  async getCustomer(options: GetCustomerArgs): Promise<Customer> {
    try {
      const { id } = options;

      const customer = await CustomerModel.aggregate<Customer>([
        {
          $match: {
            $or: [{ _id: id }],
          },
        },
        {
          $lookup: {
            from: this.orders_table_name,
            localField: '_id',
            foreignField: 'customer_id',
            as: 'orders',
          },
        },

        {
          $limit: 1,
        },
      ]);

      if (!customer || customer.length < 1)
        throw new Error(`Customer with options ${id} not found`);

      return customer[0];
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }

  async getCustomerOrders(
    options: GetCustomerOrdersArgs,
  ): Promise<CustomerOrders> {
    try {
      const { id, limit = 10, offset = 1 } = options;

      const skip = Math.abs((offset - 1) * limit);

      const customer = await CustomerModel.aggregate<CustomerOrders>([
        {
          $match: {
            _id: id,
          },
        },
        {
          $lookup: {
            from: this.orders_table_name,
            let: { customerId: '$_id' },
            pipeline: [
              { $match: { $expr: { $eq: ['$customer_id', '$$customerId'] } } },
              { $sort: { order_date: -1 } },
              { $skip: skip },
              { $limit: limit },
            ],
            as: 'orders',
          },
        },
        {
          $lookup: {
            from: this.orders_table_name,
            let: { customerId: '$_id' },
            pipeline: [
              { $match: { $expr: { $eq: ['$customer_id', '$$customerId'] } } },
              { $count: 'totalOrders' },
            ],
            as: 'totalOrdersData',
          },
        },
        {
          $addFields: {
            total_orders: {
              $ifNull: [
                { $arrayElemAt: ['$totalOrdersData.totalOrders', 0] },
                0,
              ],
            },
          },
        },
        {
          $project: {
            totalOrdersData: 0,
          },
        },
      ]);

      if (!customer || customer.length < 1)
        throw new Error(`Customer with options ${id} not found`);

      return customer[0];
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }

  async getCustomerByEmail(args: GetCustomerByEmail): Promise<Customer> {
    try {
      const { email } = args;
      const customer = await CustomerModel.aggregate<Customer>([
        {
          $match: {
            email,
          },
        },
        {
          $lookup: {
            from: this.orders_table_name,
            localField: '_id',
            foreignField: 'customer_id',
            as: 'orders',
          },
        },
        {
          $limit: 1,
        },
      ]);

      if (!customer || customer.length < 1)
        throw new Error(`Customer with email ${email} not found`);

      return customer[0];
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
