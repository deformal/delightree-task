import { GeneralResponse, ResponseMessages } from '../../types/types';
import { ProductOfOrder } from '../products/product-of-order.entity';
import { ProductsRepo } from '../../infra/repository/products.repo';

export class ProductDomainServices {
  private readonly productRepository: ProductsRepo = new ProductsRepo();
  async checkIfProductOfOrdersExists(
    args: Array<ProductOfOrder>,
  ): Promise<GeneralResponse> {
    try {
      const product_ids = args.flatMap(({ product_id }) => product_id);
      const products =
        await this.productRepository.getProductsByIds(product_ids);
      for (const product_id of product_ids) {
        if (products.has(product_id)) continue;
        throw new Error(`Product with id ${product_id} does not exist`);
      }
      return { message: ResponseMessages.SUCCESS, success: true };
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }
}
