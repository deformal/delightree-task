import { Schema, model } from 'mongoose';
import { IProductOfOrder, productOfOrderSchema } from './products.schema';

export enum OrderStatus {
  COMPLETED = 'completed',
  PENDING = 'pending',
  CANCELED = 'canceled',
}

export interface IOrder {
  _id: string;
  customer_id: string;
  products: Array<IProductOfOrder>;
  total_amount: number;
  order_date: Date;
  status: OrderStatus;
}

export const ordersSchema = new Schema<IOrder>({
  _id: { type: String, required: true },
  customer_id: { type: String, required: true, index: true },
  products: { type: [productOfOrderSchema], required: true },
  total_amount: { type: Schema.Types.Number, required: true },
  order_date: {
    type: Schema.Types.Date,
    required: true,
    default: new Date(),
    index: true,
  },
  status: {
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.PENDING,
    index: true,
    required: true,
  },
});

export const OrderModel = model<IOrder>('orders', ordersSchema);
