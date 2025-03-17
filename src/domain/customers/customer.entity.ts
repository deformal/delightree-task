import { ICustomer } from '../../infra/mongo/schemas/customer.schema';
import { randomUUID } from 'node:crypto';
import { Order } from '../orders/orders.entity';
import { UpdateCustomerArgs } from 'src/application/dto/customers.dto';

export class Customer implements ICustomer {
  public _id: string;
  public name: string;
  public email: string;
  public age: number;
  public location: string;
  public gender: string;
  public password: string;
  public created_at: Date;
  public orders?: Array<Order>;
  public biggest_order?: Order | undefined = undefined;

  constructor(customer_config: Partial<Customer>) {
    if (!customer_config.name) {
      throw new Error('Customer name is required.');
    }

    if (!customer_config.email) {
      throw new Error('Customer email is required.');
    }

    if (!customer_config.age || customer_config.age <= 0) {
      throw new Error('Customer age must be a positive number.');
    }

    if (!customer_config.location) {
      throw new Error('Customer location is required.');
    }

    if (!customer_config.gender) {
      throw new Error('Customer gender is required.');
    }

    if (customer_config.orders && customer_config.orders.length > 0)
      this.orders = customer_config.orders.map((order) => new Order(order));
    this._id = customer_config._id || randomUUID();
    this.created_at = customer_config.created_at || new Date();
    this.name = customer_config.name;
    this.email = customer_config.email;
    this.age = customer_config.age;
    this.location = customer_config.location;
    this.gender = customer_config.gender;
    this.setBiggestOrder();
  }

  updateCustomer(args: UpdateCustomerArgs): Customer {
    this.created_at = args.created_at || new Date();
    this.name = args.name || this.name;
    this.email = args.email || this.email;
    this.age = args.age || this.age;
    this.location = args.location || this.location;
    this.gender = args.gender || this.gender;
    return this;
  }

  setBiggestOrder(): Customer {
    if (!this.orders || this.orders.length < 1) return this;
    this.biggest_order = this.orders.sort(
      (a, b) => b.total_amount - a.total_amount,
    )[0];
    return this;
  }
}
