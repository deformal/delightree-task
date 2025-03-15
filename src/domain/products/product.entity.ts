import { IProduct } from '@delightree-task-models/products.schema';
import { randomUUID } from 'node:crypto';

export class Product implements IProduct {
  public _id: string;
  public name: string;
  public category: string;
  public price: number;
  public stock: number;
  public created_at: Date;

  constructor(product_config: IProduct) {
    this.validateProductConfig(product_config);
    this._id = product_config._id || randomUUID();
    this.created_at = product_config.created_at || new Date();
    this.name = product_config.name;
    this.category = product_config.category;
    this.price = product_config.price;
    this.stock = product_config.stock;
  }

  private validateProductConfig(product_config: IProduct) {
    if (!product_config.name) {
      throw new Error('Product name is required.');
    }
    if (!product_config.category) {
      throw new Error('Product category is required.');
    }
    if (product_config.price === undefined || product_config.price < 0) {
      throw new Error('Product price must be a non-negative number.');
    }
    if (product_config.stock === undefined || product_config.stock < 0) {
      throw new Error('Product stock must be a non-negative number.');
    }
  }
}
