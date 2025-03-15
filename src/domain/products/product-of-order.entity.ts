import {
  IProduct,
  IProductOfOrder,
} from '@delightree-task-models/products.schema';
import { Product } from './product.entity';

export class ProductOfOrder implements IProductOfOrder {
  public product_id: string;
  public quantity: number;
  public price_at_purchase: number;
  public product_details_now: Product;

  constructor(product_order_config: IProductOfOrder) {
    this.validateProductOrderConfig(product_order_config);
    this.product_id = product_order_config.product_id;
    this.quantity = product_order_config.quantity;
    this.price_at_purchase = product_order_config.price_at_purchase;
  }

  private validateProductOrderConfig(product_order_config: IProductOfOrder) {
    if (!product_order_config.product_id) {
      throw new Error('Product ID is required.');
    }
    if (
      product_order_config.quantity === undefined ||
      product_order_config.quantity <= 0
    ) {
      throw new Error('Product quantity must be a positive number.');
    }
    if (
      product_order_config.price_at_purchase === undefined ||
      product_order_config.price_at_purchase < 0
    ) {
      throw new Error('Price at purchase must be a non-negative number.');
    }
  }

  setCurrentProductDataForThisProduct(product: IProduct): void {
    this.product_details_now = new Product(product);
  }
}
