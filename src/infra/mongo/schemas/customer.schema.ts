import { Schema, Types, model } from 'mongoose';

export interface ICustomer {
  _id: Types.ObjectId;
  name: string;
  email: string;
  age: number;
  location: string;
  gender: string;
}

export const customerSchema = new Schema<ICustomer>({
  _id: { type: Schema.Types.ObjectId, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true, index: true },
  location: { type: String, required: true, index: true },
  gender: { type: String, required: true, index: true },
});

export const Customer = model<ICustomer>('customers', customerSchema);
