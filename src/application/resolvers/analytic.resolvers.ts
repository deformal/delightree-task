import { Args, Query, Resolver } from 'type-graphql';

import {
  CustomerSpending,
  GetCustomerSpendingArgs,
  GetSalesAnalyticsArgs,
  GetTopSellingProductsArgs,
  SalesAnalytics,
  TopProduct,
} from '../dto/analytics.dto';
import { AnalyticsService } from '../services/analytics/analytics.services';

@Resolver()
export class AnalyticsResolver {
  private readonly analyticsService: AnalyticsService = new AnalyticsService();

  @Query(() => CustomerSpending)
  async getCustomerSpending(
    @Args() args: GetCustomerSpendingArgs,
  ): Promise<CustomerSpending> {
    return await this.analyticsService.getCustomerTotalSpending(args);
  }

  @Query(() => [TopProduct])
  async getTopSellingProducts(
    @Args() args: GetTopSellingProductsArgs,
  ): Promise<Array<TopProduct>> {
    return await this.analyticsService.getTopSellingProducts(args);
  }

  @Query(() => SalesAnalytics)
  async getSalesAnalytics(
    @Args() args: GetSalesAnalyticsArgs,
  ): Promise<SalesAnalytics> {
    return await this.analyticsService.getSalesAnalytics(args);
  }
}
