import { IOrder, OrderStatus } from '@delightree-task-models/orders.schema';
import { ProductOfOrder } from '../products/product-of-order.entity';
import { randomUUID } from 'crypto';

export class Order implements IOrder {
  public _id: string;
  public customer_id: string;
  public total_amount: number;
  public order_date: Date;
  public status: OrderStatus;
  public products: ProductOfOrder[];

  constructor(order_config: IOrder) {
    this.validateOrderConfig(order_config);
    this._id = order_config._id || randomUUID();
    this.order_date = order_config.order_date || new Date();
    this.customer_id = order_config.customer_id;
    this.total_amount = order_config.total_amount;
    this.status = order_config.status;
    this.products = order_config.products.map(
      (product) => new ProductOfOrder(product),
    );
  }

  private validateOrderConfig(order_config: IOrder) {
    if (!order_config.customer_id) {
      throw new Error('Customer ID is required.');
    }
    if (!order_config.products || order_config.products.length === 0) {
      throw new Error('At least one product is required in an order.');
    }
    if (
      order_config.total_amount === undefined ||
      order_config.total_amount < 0
    ) {
      throw new Error('Total amount must be a non-negative number.');
    }
    if (!order_config.status) {
      throw new Error('Order status is required.');
    }
  }
}
