import {
  IProduct,
  IProductOfOrder,
} from '@delightree-task-models/products.schema';
import { Field, Float, ObjectType } from 'type-graphql';

@ObjectType()
export class ProductsDTO implements IProduct {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  category: string;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  stock: number;

  @Field(() => String)
  created_at: Date;
}

@ObjectType()
export class ProductsOfOrderDTO implements IProductOfOrder {
  @Field(() => String)
  product_id: string;

  @Field(() => Float)
  quantity: number;

  @Field(() => Float)
  price_at_purchase: number;
}
