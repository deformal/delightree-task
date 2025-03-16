import {
  CustomerSpending,
  GetCustomerSpendingArgs,
  GetSalesAnalyticsArgs,
  GetTopSellingProductsArgs,
  SalesAnalytics,
  TopProduct,
} from 'src/application/dto/analytics.dto';
import { GraphQLError } from 'graphql';
import { AnalyticsRepository } from '../../../infra/repository/analytics.repo';

export class AnalyticsService {
  private readonly analyticsRepo: AnalyticsRepository =
    new AnalyticsRepository();

  async getCustomerTotalSpending(
    args: GetCustomerSpendingArgs,
  ): Promise<CustomerSpending> {
    try {
      const res = await this.analyticsRepo.getCustomerSpending(args);
      if (!res) throw new Error('No Data found related to the customer');
      return res;
    } catch (err) {
      const error = err as Error;
      console.error(error.message);
      throw new GraphQLError(error.message);
    }
  }

  async getTopSellingProducts(
    args: GetTopSellingProductsArgs,
  ): Promise<Array<TopProduct>> {
    try {
      const res = await this.analyticsRepo.getTopSellingProducts(args);
      if (!res) throw new Error('No Data found related to the customer');
      return res;
    } catch (err) {
      const error = err as Error;
      console.error(error.message);
      throw new GraphQLError(error.message);
    }
  }

  async getSalesAnalytics(
    args: GetSalesAnalyticsArgs,
  ): Promise<SalesAnalytics> {
    try {
      const res = await this.analyticsRepo.getSalesAnalytics(args);
      if (!res) throw new Error('No Data found');
      return res;
    } catch (err) {
      const error = err as Error;
      console.error(error.message);
      throw new GraphQLError(error.message);
    }
  }
}
