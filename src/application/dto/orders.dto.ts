import { IOrder, OrderStatus } from '../../infra/mongo/schemas/orders.schema';
import {
  ArgsType,
  Field,
  Float,
  ObjectType,
  registerEnumType,
} from 'type-graphql';
import { ProductsOfOrderArgs, ProductsOfOrderDTO } from './products.dto';
import { ProductOfOrder } from 'src/domain/products/product-of-order.entity';
import { DateTimeISOResolver } from 'graphql-scalars';

registerEnumType(OrderStatus, { name: 'OrderStatusEnum' });

@ObjectType()
export class OrdersDTO implements IOrder {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  customer_id: string;

  @Field(() => Float)
  total_amount: number;

  @Field(() => DateTimeISOResolver)
  order_date: Date;

  @Field(() => String)
  status: OrderStatus;

  @Field(() => [ProductsOfOrderDTO])
  products: ProductOfOrder[];
}

@ArgsType()
export class UpdateOrderStatusArgs {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => OrderStatus, { nullable: false })
  status: OrderStatus;
}

@ArgsType()
export class GetOrderArgs {
  @Field(() => String, { nullable: false })
  id: string;
}

@ArgsType()
export class CreateNewOrderArgs {
  @Field(() => String)
  customer_id: string;

  @Field(() => [ProductsOfOrderArgs])
  products: ProductOfOrder[];
}
