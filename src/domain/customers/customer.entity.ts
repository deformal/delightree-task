import { ICustomer } from '../../infra/mongo/schemas/customer.schema';
import { randomBytes, randomUUID } from 'node:crypto';
import { Order } from '../orders/orders.entity';

export class Customer implements ICustomer {
  public _id: string;
  public name: string;
  public email: string;
  public age: number;
  public location: string;
  public gender: string;
  public password: string;
  public created_at: Date;
  public orders: Array<Order>;
  private salt = randomBytes(16).toString('hex');

  constructor(customer_config: ICustomer) {
    this.validateCustomerConfig(customer_config);
    this._id = customer_config._id || randomUUID();
    this.created_at = customer_config.created_at || new Date();
    this.name = customer_config.name;
    this.email = customer_config.email;
    this.age = customer_config.age;
    this.location = customer_config.location;
    this.gender = customer_config.gender;
  }

  private validateCustomerConfig(customer_config: ICustomer): void {
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
  }
}
