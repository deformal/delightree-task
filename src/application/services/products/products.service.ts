import { GetAllProductsArgs } from 'src/application/dto/products.dto';
import { Product } from '../../../domain/products/product.entity';
import { ProductsRepo } from '../../../infra/repository/products.repo';

export class ProductService {
  private readonly productRepository: ProductsRepo = new ProductsRepo();
  async getAllProducts(args: GetAllProductsArgs): Promise<Array<Product>> {
    try {
      const products = await this.productRepository.getAllProducts(args);
      const products_instances: Array<Product> = [];
      for (const product of products.values())
        products_instances.push(new Product(product));
      return products_instances;
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }
}
