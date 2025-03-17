import { GeneralResponse, ResponseMessages } from '../../types/types';
import { Product } from 'src/domain/products/product.entity';
import { ProductModel } from '../mongo/schemas/products.schema';
import {
  GetAllProductsArgs,
  GetProductsArgs,
} from 'src/application/dto/products.dto';

export class ProductsRepo {
  async createProduct(product: Product): Promise<GeneralResponse> {
    try {
      const customer_model = new ProductModel(product);
      await customer_model.save();
      return { message: ResponseMessages.SUCCESS, success: true };
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
      return { message: ResponseMessages.SUCCESS, success: true };
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
      return { message: ResponseMessages.SUCCESS, success: true };
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }

  async getProduct(args: GetProductsArgs): Promise<Product> {
    try {
      const { id } = args;

      const product = await ProductModel.findOne<Product>({
        $or: [{ _id: id }, { name: name }],
      });
      if (!product) throw new Error(`Customer with options ${id} not found`);
      return product;
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }

  async getProductsByIds(args: Array<string>): Promise<Map<string, Product>> {
    try {
      if (!args || args.length < 0)
        throw new Error(`Products ids must be sent to getProductsByIds`);
      const product_ids = args;
      const products = await ProductModel.find<Product>({
        _id: { $in: product_ids },
      });
      const products_map = new Map<string, Product>();
      for (const product of products) {
        products_map.set(product._id, product);
      }
      return products_map;
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }

  async getAllProducts(
    args: GetAllProductsArgs,
  ): Promise<Map<string, Product>> {
    try {
      const get_products_count = await ProductModel.countDocuments();
      const products = await ProductModel.find<Product>().limit(
        args.limit || get_products_count,
      );
      if (!products || products.length < 1)
        throw new Error(`No products found`);
      const products_map = new Map<string, Product>();
      for (const product of products) {
        products_map.set(product._id, product);
      }
      return products_map;
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }
}
