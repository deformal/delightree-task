import { ProductModel } from '../mongo/schemas/products.schema';
import { CustomerModel } from '../mongo/schemas/customer.schema';
import { OrderModel, OrderStatus } from '../mongo/schemas/orders.schema';
import {
  CustomerSpending,
  GetCustomerSpendingArgs,
  GetSalesAnalyticsArgs,
  GetTopSellingProductsArgs,
  SalesAnalytics,
  TopProduct,
} from 'src/application/dto/analytics.dto';

export class AnalyticsRepository {
  private readonly orders_table_name: string = 'orders';

  async getCustomerSpending(
    args: GetCustomerSpendingArgs,
  ): Promise<CustomerSpending> {
    try {
      const { customer_id } = args;
      const customer = await CustomerModel.aggregate<CustomerSpending>([
        {
          $match: {
            _id: customer_id,
          },
        },
        {
          $lookup: {
            from: this.orders_table_name,
            localField: '_id',
            foreignField: 'customer_id',
            as: 'orders',
          },
        },
        {
          $addFields: {
            total_spent: {
              $cond: {
                if: { $gt: [{ $size: '$orders' }, 0] },
                then: { $sum: '$orders.total_amount' },
                else: null,
              },
            },
            average_order_value: {
              $cond: {
                if: { $gt: [{ $size: '$orders' }, 0] },
                then: { $avg: '$orders.total_amount' },
                else: null,
              },
            },
            last_order_date: {
              $max: '$orders.order_date',
            },
            orders: '$orders',
          },
        },
        {
          $project: {
            customer_id: '$_id',
            customer: {
              _id: '$_id',
              name: '$name',
              email: '$email',
              gender: '$gender',
              age: '$age',
              location: '$location',
              created_at: '$created_at',
              orders: '$orders',
            },
            total_spent: 1,
            average_order_value: 1,
            last_order_date: 1,
          },
        },
        {
          $limit: 1,
        },
      ]);

      if (!customer || customer.length < 1)
        throw new Error(`Customer data for with id ${customer_id} not found`);

      return customer[0];
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }

  async getTopSellingProducts(
    args: GetTopSellingProductsArgs,
  ): Promise<Array<TopProduct>> {
    try {
      const { limit } = args;
      const products = await ProductModel.aggregate<TopProduct>([
        {
          $lookup: {
            from: this.orders_table_name,
            localField: '_id',
            foreignField: 'products.product_id',
            as: 'orders',
          },
        },
        {
          $unwind: {
            path: '$orders',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: {
            path: '$orders.products',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: {
            'orders.products.product_id': { $exists: true },
          },
        },
        {
          $group: {
            _id: '$_id',
            name: { $first: '$name' },
            total_sold: { $sum: '$orders.products.quantity' },
          },
        },
        {
          $project: {
            product_id: '$_id',
            name: 1,
            total_sold: 1,
          },
        },
        {
          $sort: {
            total_sold: -1,
          },
        },
        {
          $limit: limit,
        },
      ]);
      return products;
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }

  async getSalesAnalytics(
    args: GetSalesAnalyticsArgs,
  ): Promise<SalesAnalytics> {
    try {
      const { start_date, end_date } = args;
      const sales_analytics = await OrderModel.aggregate<SalesAnalytics>([
        {
          $match: {
            status: OrderStatus.COMPLETED,
            order_date: {
              $gte: new Date(start_date),
              $lte: new Date(end_date),
            },
          },
        },
        { $unwind: '$products' },
        {
          $lookup: {
            from: 'products',
            localField: 'products.product_id',
            foreignField: '_id',
            as: 'product_data',
          },
        },
        {
          $unwind: {
            path: '$product_data',
          },
        },
        {
          $group: {
            _id: '$product_data.category',
            revenue: {
              $sum: {
                $multiply: [
                  '$products.quantity',
                  '$products.price_at_purchase',
                ],
              },
            },
          },
        },
        {
          $group: {
            _id: null,
            total_revenue: { $sum: '$revenue' },
            category_breakdown: {
              $push: {
                category: '$_id',
                revenue: '$revenue',
              },
            },
          },
        },
        {
          $lookup: {
            from: 'orders',
            pipeline: [
              {
                $match: {
                  status: 'completed',
                  order_date: {
                    $gte: new Date(start_date),
                    $lte: new Date(end_date),
                  },
                },
              },
              { $count: 'completed_orders' },
            ],
            as: 'order_count',
          },
        },
        {
          $project: {
            _id: 0,
            total_revenue: 1,
            category_breakdown: 1,
            completed_orders: {
              $arrayElemAt: ['$order_count.completed_orders', 0],
            },
          },
        },
      ]);
      return sales_analytics[0];
    } catch (err) {
      const error = err as Error;
      console.error(error);
      throw new Error(error.message);
    }
  }
}
