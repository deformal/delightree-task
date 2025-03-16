import { DateTimeISOResolver } from 'graphql-scalars';
import { Field, ArgsType, ID, ObjectType, Float, Int } from 'type-graphql';
import { CustomersDTO } from './customers.dto';
import { ICustomer } from '@delightree-task-models/customer.schema';

@ArgsType()
export class GetCustomerSpendingArgs {
  @Field(() => ID, { nullable: false })
  customer_id: string;
}

@ArgsType()
export class GetTopSellingProductsArgs {
  @Field(() => Int, { nullable: false })
  limit: number;
}

@ArgsType()
export class GetSalesAnalyticsArgs {
  @Field(() => String, { nullable: false })
  start_date: string;

  @Field(() => String, { nullable: false })
  end_date: string;
}

@ObjectType()
export class CustomerSpending {
  @Field(() => ID, { nullable: false })
  customer_id: string;

  @Field(() => CustomersDTO, { nullable: false })
  customer: ICustomer;

  @Field(() => Float, { nullable: true })
  total_spent: number;

  @Field(() => Float, { nullable: true })
  average_order_value: number;

  @Field(() => DateTimeISOResolver, { nullable: true })
  last_order_date: Date;
}

@ObjectType()
export class TopProduct {
  @Field(() => ID, { nullable: false })
  product_id: string;

  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => Float, { nullable: true })
  total_sold: number;
}

@ObjectType()
export class SalesAnalytics {
  @Field(() => Float, { nullable: true })
  total_revenue: number;

  @Field(() => Float, { nullable: true })
  completed_orders: number;

  @Field(() => [SalesAnalyticsCategoryBreakdown], { nullable: true })
  category_breakdown: Array<SalesAnalyticsCategoryBreakdown>;
}

@ObjectType()
export class SalesAnalyticsCategoryBreakdown {
  @Field(() => String, { nullable: false })
  category: string;

  @Field(() => Float, { nullable: true })
  revenue: number;
}
