import { Schema, Types, model } from 'mongoose';

export interface IProduct {
  _id: Types.ObjectId;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export interface IProductOfOrder {
  product_id: Types.ObjectId;
  quantity: number;
  price_at_purchase: number;
}

export const productSchema = new Schema<IProduct>({
  _id: { type: Schema.Types.ObjectId, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true, index: true },
  price: { type: Number, required: true, index: true },
  stock: { type: Number, required: true, index: true },
});

export const productOfOrderSchema = new Schema<IProductOfOrder>({
  product_id: { type: Schema.Types.ObjectId, required: true, unique: true },
  quantity: { type: Number, required: true },
  price_at_purchase: { type: Number, required: true },
});

export const Product = model<IProduct>('products', productSchema);
