import { ICustomer } from '@delightree-task-models/customer.schema';
import { Types } from 'mongoose';

export class Customer implements ICustomer {
  public _id: Types.ObjectId;
  public name: string;
  public email: string;
  public age: number;
  public location: string;
  public gender: string;
  public password: string;
  public created_at: Date;

  constructor(customer_config: ICustomer) {
    this.validateCustomerConfig(customer_config);
    this._id = customer_config._id || new Types.ObjectId();
    this.created_at = customer_config.created_at || new Date();
    this.name = customer_config.name;
    this.email = customer_config.email;
    this.age = customer_config.age;
    this.location = customer_config.location;
    this.gender = customer_config.gender;
    this.password = customer_config.password;
  }

  private validateCustomerConfig(customer_config: ICustomer) {
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
    if (!customer_config.password) {
      throw new Error('Customer password is required.');
    }
  }
}
