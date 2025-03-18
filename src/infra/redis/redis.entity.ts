import { createClient, RedisClientType, RedisDefaultModules } from 'redis';
import { REDIS_URI } from '../../constants';
import {
  CustomerSpending,
  GetSalesAnalyticsArgs,
  SalesAnalytics,
  TopProduct,
} from 'src/application/dto/analytics.dto';

class RedisClient {
  private readonly redis_uri: string = REDIS_URI;
  private redis_client: RedisClientType<RedisDefaultModules>;

  constructor() {
    this.redis_client = createClient({ url: this.redis_uri });
    this.redis_client.on('error', (err) =>
      console.error('Redis client error', err),
    );
    console.log('Redis client initialized');
  }

  async connect(): Promise<void> {
    try {
      await this.redis_client.connect();
      console.log('Connected to Redis');
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
    }
  }

  async setCustomerTotalSpendingDataInCache(
    args: CustomerSpending,
  ): Promise<void> {
    try {
      await this.redis_client.set(args.customer_id, JSON.stringify(args), {
        EX: 120,
      });
    } catch (error) {
      console.error('Error setting customer spending data in Redis:', error);
    }
  }

  async getCustomerTotalSpendingDataFromCache(
    customerId: string,
  ): Promise<CustomerSpending | null> {
    try {
      const data = await this.redis_client.get(customerId);
      if (data) return JSON.parse(data) as CustomerSpending;
      return null;
    } catch (error) {
      console.error('Error getting customer spending data from Redis:', error);
      return null;
    }
  }

  async setTopSellingProducts(
    args: Array<TopProduct>,
    limit: number,
  ): Promise<void> {
    try {
      await this.redis_client.set(
        `top_${limit}_selling_product`,
        JSON.stringify(args),
        {
          EX: 120,
        },
      );
    } catch (error) {
      console.error('Error getting customer spending data from Redis:', error);
    }
  }

  async getTopSellingProductsFromCache(
    limit: number,
  ): Promise<Array<TopProduct> | null> {
    try {
      const data = await this.redis_client.get(`top_${limit}_selling_product`);
      if (data) return JSON.parse(data) as Array<TopProduct>;
      return null;
    } catch (error) {
      console.error('Error getting customer spending data from Redis:', error);
      return null;
    }
  }

  async setSalesAnalytics(
    dates: GetSalesAnalyticsArgs,
    args: SalesAnalytics,
  ): Promise<void> {
    try {
      const start_date_value = dates.start_date.split('T')[0];
      const end_date_value = dates.end_date.split('T')[0];
      const uniqueId = start_date_value + end_date_value;
      await this.redis_client.set(uniqueId, JSON.stringify(args), {
        EX: 120,
      });
    } catch (error) {
      console.error('Error getting customer spending data from Redis:', error);
    }
  }

  async getSalesAnalytics(
    args: GetSalesAnalyticsArgs,
  ): Promise<SalesAnalytics | null> {
    try {
      const start_date_value = args.start_date.split('T')[0];
      const end_date_value = args.end_date.split('T')[0];
      const uniqueId = start_date_value + end_date_value;
      const data = await this.redis_client.get(uniqueId);
      if (data) return JSON.parse(data) as SalesAnalytics;
      return null;
    } catch (error) {
      console.error('Error getting customer spending data from Redis:', error);
      return null;
    }
  }
}

export const redisClient = new RedisClient();
