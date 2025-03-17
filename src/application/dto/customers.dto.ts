import { Field, ObjectType, Int, ArgsType } from 'type-graphql';
import { ICustomer } from '@delightree-task-models/customer.schema';
import { OrdersDTO } from './orders.dto';
import { IOrder } from '@delightree-task-models/orders.schema';
import { Order } from 'src/domain/orders/orders.entity';

@ObjectType()
export class CustomersDTO implements ICustomer {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  created_at: Date;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => Int)
  age: number;

  @Field(() => String)
  location: string;

  @Field(() => String)
  gender: string;

  @Field(() => [OrdersDTO], { nullable: true })
  orders: IOrder[];
}

@ObjectType()
export class CustomerOrders {
  @Field(() => Int)
  total_orders: number;

  @Field(() => [OrdersDTO], { nullable: true })
  orders?: Array<Order>;
}

@ArgsType()
export class GetCustomerArgs {
  @Field(() => String, { nullable: false })
  id: string;
}

@ArgsType()
export class GetCustomerByEmail {
  @Field(() => String, { nullable: false })
  email: string;
}

@ArgsType()
export class GetCustomerOrdersArgs {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  limit: number;

  @Field(() => Int, { nullable: true, defaultValue: 1 })
  offset: number;
}

@ArgsType()
export class UpdateCustomerArgs {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: true })
  created_at?: Date;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field(() => String, { nullable: true })
  location?: string;

  @Field(() => String, { nullable: true })
  gender?: string;
}

@ArgsType()
export class DeleteCustomerArgs {
  @Field(() => String, { nullable: true })
  id: string;
}

@ArgsType()
export class CreateCustomerArgs {
  @Field(() => String, { nullable: true, defaultValue: new Date() })
  created_at?: Date;

  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field(() => String, { nullable: true })
  location?: string;

  @Field(() => String, { nullable: true })
  gender?: string;
}
