import { GeneralResponse } from '@delightree-task/types';

export interface OrdersPort {
  createOrder(): Promise<GeneralResponse>;
  updateOrder(): Promise<GeneralResponse>;
  deleteOrder(): Promise<GeneralResponse>;
  getOrder(): Promise<GeneralResponse>;
}
