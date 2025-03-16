import { Field, ObjectType, Int, ArgsType } from 'type-graphql';
import { ICustomer } from '@delightree-task-models/customer.schema';
import { OrdersDTO } from './orders.dto';
import { IOrder } from '@delightree-task-models/orders.schema';

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

@ArgsType()
export class GetCustomerOptionsDTO {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  email: string;
}
