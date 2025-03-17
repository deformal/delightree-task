import { IOrder, OrderStatus } from '../../infra/mongo/schemas/orders.schema';
import { ProductOfOrder } from '../products/product-of-order.entity';
import { randomUUID } from 'crypto';
import { UpdateOrderStatusArgs } from 'src/application/dto/orders.dto';

export class Order implements IOrder {
  public _id: string;
  public customer_id: string;
  public total_amount: number;
  public order_date: Date;
  public status: OrderStatus;
  public products: ProductOfOrder[];

  constructor(order_config: Partial<Order>) {
    if (!order_config.customer_id) {
      throw new Error('Customer ID is required.');
    }

    if (!order_config.products || order_config.products.length === 0) {
      throw new Error('At least one product is required in an order.');
    }

    this.products = order_config.products.map(
      (product) => new ProductOfOrder(product),
    );
    this._id = order_config._id || randomUUID();
    this.order_date = order_config.order_date || new Date();
    this.customer_id = order_config.customer_id;
    this.status = order_config.status || OrderStatus.PENDING;
    this.setTotalAmount();
  }

  updateOrderStatus(args: UpdateOrderStatusArgs): Order {
    this.status = args.status || this.status;
    return this;
  }

  setTotalAmount(): Order {
    this.total_amount = this.products.reduce(
      (total, { price_at_purchase, quantity }) =>
        (total += quantity * price_at_purchase),
      0,
    );
    return this;
  }
}
