import { OrderModel } from '../mongo/schemas/orders.schema';
import { GeneralResponse, ResponseMessages } from '../../types/types';
import { GetOrderArgs } from 'src/application/dto/orders.dto';
import { Order } from 'src/domain/orders/orders.entity';

export class OrderRepository {
  async getOrder(args: GetOrderArgs): Promise<Order> {
    try {
      const { id } = args;
      const order = await OrderModel.findOne<Order>({ _id: id });
      if (!order) throw new Error(`Order not found with id ${id}`);
      return order;
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }

  async updateOrder(order: Order): Promise<GeneralResponse> {
    try {
      const new_order = new OrderModel(order);
      await new_order.updateOne({ status: order.status });
      return { message: ResponseMessages.SUCCESS, success: true };
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }

  async createOrder(order: Order): Promise<GeneralResponse> {
    try {
      const new_order = new OrderModel(order);
      await new_order.save();
      return { message: ResponseMessages.SUCCESS, success: true };
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }
}
