import { GeneralResponse } from '@delightree-task/types';
import {
  CreateNewOrderArgs,
  GetOrderArgs,
  UpdateOrderStatusArgs,
} from 'src/application/dto/orders.dto';
import { Order } from '../../../domain/orders/orders.entity';
import { ProductDomainServices } from '../../../domain/services/product.domain.service';
import { CustomersRepo } from '../../../infra/repository/customers.repo';
import { OrderRepository } from '../../../infra/repository/orders.repo';

export class OrderService {
  private readonly orderRepository: OrderRepository = new OrderRepository();
  private readonly customerRepository: CustomersRepo = new CustomersRepo();
  private readonly productDomainService: ProductDomainServices =
    new ProductDomainServices();

  async getOrder(args: GetOrderArgs): Promise<Order> {
    try {
      const order = await this.orderRepository.getOrder(args);
      const order_instance = new Order(order);
      return order_instance;
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }

  async updateOrderStatus(
    args: UpdateOrderStatusArgs,
  ): Promise<GeneralResponse> {
    try {
      const order = await this.orderRepository.getOrder(args);
      const order_instance = new Order(order);
      order_instance.updateOrderStatus(args);
      const res = await this.orderRepository.updateOrder(order_instance);
      return res;
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }

  async createOrder(args: CreateNewOrderArgs): Promise<Order> {
    try {
      const order_instance = new Order(args);
      const customer = await this.customerRepository.getCustomer({
        id: order_instance.customer_id,
      });
      if (!customer)
        throw new Error(
          `Customer for this order with customer id ${order_instance.customer_id} was not found`,
        );
      await this.productDomainService.checkIfProductOfOrdersExists(
        order_instance.products,
      );
      const res = await this.orderRepository.createOrder(order_instance);
      if (!res.success)
        throw new Error(`Error occured during the creation of an order`);
      return order_instance;
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }
}
