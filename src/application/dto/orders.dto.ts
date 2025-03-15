import { IOrder, OrderStatus } from '../../infra/mongo/schemas/orders.schema';
import { IProductOfOrder } from '../../infra/mongo/schemas/products.schema';
import { Field, Float, ObjectType } from 'type-graphql';
import { ProductsOfOrderDTO } from './products.dto';

@ObjectType()
export class OrdersDTO implements IOrder {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  customer_id: string;

  @Field(() => Float)
  total_amount: number;

  @Field(() => String)
  order_date: Date;

  @Field(() => String)
  status: OrderStatus;

  @Field(() => [ProductsOfOrderDTO])
  products: IProductOfOrder[];
}
