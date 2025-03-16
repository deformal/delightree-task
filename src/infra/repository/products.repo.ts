import {
  GeneralResponse,
  GetProductOptionsTypes,
  ResponseMessages,
} from '../../types/types';
import { Product } from 'src/domain/products/product.entity';
import { ProductModel } from '@delightree-task-models/products.schema';

export class ProductsRepo {
  private readonly orders_table_name: string = 'orders';

  async createProduct(product: Product): Promise<GeneralResponse> {
    try {
      const customer_model = new ProductModel(product);
      await customer_model.save();
      return { message: ResponseMessages.SUCCESS, ok: true };
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }

  async updateProduct(product: Product): Promise<GeneralResponse> {
    try {
      const customer_model = new ProductModel(product);
      await customer_model.save();
      return { message: ResponseMessages.SUCCESS, ok: true };
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }

  async deleteProduct(product: Product): Promise<GeneralResponse> {
    try {
      const customer_model = new ProductModel(product);
      await customer_model.deleteOne();
      return { message: ResponseMessages.SUCCESS, ok: true };
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }

  async getProduct(options: GetProductOptionsTypes): Promise<Product> {
    try {
      const { id, name } = options;

      if (!id && !name)
        throw new Error('Either id or name is needed to fetch a product');

      const product = await ProductModel.findOne<Product>({
        $or: [{ _id: id }, { name: name }],
      });

      if (!product)
        throw new Error(`Customer with options ${id ? id : name} not found`);

      return product;
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }

  async getAllProducts(): Promise<Array<Product>> {
    try {
      const customers = await ProductModel.find<Product>();

      if (!customers || customers.length < 1)
        throw new Error(`No customers found`);

      return customers;
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }
}
