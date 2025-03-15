import { Schema, model } from 'mongoose';

export interface ICustomer {
  _id: string;
  created_at: Date;
  name: string;
  email: string;
  age: number;
  location: string;
  gender: string;
  password: string;
}

export const customerSchema = new Schema<ICustomer>({
  _id: { type: String, required: true },
  created_at: { type: Schema.Types.Date, required: true, default: new Date() },
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true, index: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true, index: true },
  location: { type: String, required: true, index: true },
  gender: { type: String, required: true, index: true },
});

export const CustomerModel = model<ICustomer>('customers', customerSchema);
