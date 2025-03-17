import { Args, Mutation, Query, Resolver } from 'type-graphql';
import {
  CreateNewOrderArgs,
  GetOrderArgs,
  OrdersDTO,
  UpdateOrderStatusArgs,
} from '../dto/orders.dto';
import { Order } from 'src/domain/orders/orders.entity';
import { OrderService } from '../services/orders/orders.service';
import { GeneralResponse } from '../dto/general.dto';

@Resolver()
export class OrdersResolver {
  private readonly orderService: OrderService = new OrderService();

  @Query(() => OrdersDTO)
  async getOrder(@Args() args: GetOrderArgs): Promise<Order> {
    return await this.orderService.getOrder(args);
  }

  @Mutation(() => OrdersDTO)
  async createOrder(@Args() args: CreateNewOrderArgs): Promise<Order> {
    return await this.orderService.createOrder(args);
  }

  @Mutation(() => GeneralResponse)
  async updateOrderStatus(
    @Args() args: UpdateOrderStatusArgs,
  ): Promise<GeneralResponse> {
    return await this.orderService.updateOrderStatus(args);
  }
}
