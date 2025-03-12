import { Schema, model, Types } from 'mongoose';
import { IProductOfOrder, productOfOrderSchema } from './products.schema';

export enum OrderStatus {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
}

export interface IOrder {
  _id: Types.ObjectId;
  customer_id: Types.ObjectId;
  products: Array<IProductOfOrder>;
  total_amount: number;
  order_date: Date;
  status: OrderStatus;
}

export const ordersSchema = new Schema<IOrder>({
  _id: { type: Schema.Types.ObjectId, required: true, unique: true },
  customer_id: { type: Schema.Types.ObjectId, required: true, index: true },
  products: { type: [productOfOrderSchema], required: true },
  total_amount: { type: Schema.Types.Number, required: true },
  order_date: { type: Schema.Types.Date, required: true, default: new Date() },
  status: {
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.PENDING,
    required: true,
  },
});

export const OrderModel = model<IOrder>('orders', ordersSchema);
