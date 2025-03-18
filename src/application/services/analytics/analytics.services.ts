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
import { redisClient } from '../../../infra/redis/redis.entity';

export class AnalyticsService {
  private readonly analyticsRepo: AnalyticsRepository =
    new AnalyticsRepository();

  async getCustomerTotalSpending(
    args: GetCustomerSpendingArgs,
  ): Promise<CustomerSpending> {
    try {
      const { customer_id } = args;
      const cached_data =
        await redisClient.getCustomerTotalSpendingDataFromCache(customer_id);
      if (cached_data) return cached_data;
      const res = await this.analyticsRepo.getCustomerSpending(args);
      if (!res) throw new Error('No Data found related to the customer');
      await redisClient.setCustomerTotalSpendingDataInCache(res);
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
      const cached_data = await redisClient.getTopSellingProductsFromCache();
      if (cached_data) return cached_data;
      const res = await this.analyticsRepo.getTopSellingProducts(args);
      if (!res) throw new Error('No Data found related to the customer');
      await redisClient.setTopSellingProducts(res);
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
      const cached_data = await redisClient.getSalesAnalytics(args);
      if (cached_data) return cached_data;
      const res = await this.analyticsRepo.getSalesAnalytics(args);
      if (!res) throw new Error('No Data found');
      await redisClient.setSalesAnalytics(args, res);
      return res;
    } catch (err) {
      const error = err as Error;
      console.error(error.message);
      throw new GraphQLError(error.message);
    }
  }
}
