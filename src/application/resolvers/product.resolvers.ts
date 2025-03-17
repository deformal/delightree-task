import { Args, Query, Resolver } from 'type-graphql';
import { GetAllProductsArgs, ProductsDTO } from '../dto/products.dto';
import { Product } from 'src/domain/products/product.entity';
import { ProductService } from '../services/products/products.service';

@Resolver()
export class ProductResolver {
  private readonly productSerice: ProductService = new ProductService();
  @Query(() => [ProductsDTO])
  async getProducts(@Args() args: GetAllProductsArgs): Promise<Array<Product>> {
    return await this.productSerice.getAllProducts(args);
  }
}
