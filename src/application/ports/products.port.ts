import { GeneralResponse } from '@delightree-task/types';

export interface ProductsPort {
  createProduct(): Promise<GeneralResponse>;
  updateProduct(): Promise<GeneralResponse>;
  deleteProduct(): Promise<GeneralResponse>;
  getProduct(): Promise<GeneralResponse>;
}
