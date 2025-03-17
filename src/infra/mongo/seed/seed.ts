import { readFileSync } from 'node:fs';
import { CustomerModel, ICustomer } from '../schemas/customer.schema';
import { OrderModel } from '../schemas/orders.schema';
import { ProductModel, IProduct } from '../schemas/products.schema';
import path from 'node:path';
import { Customer } from '../../../domain/customers/customer.entity';
import { Order } from '../../../domain/orders/orders.entity';
import { Product } from '../../../domain/products/product.entity';
import { startSession } from 'mongoose';

const customers_json_file_path = path.join(__dirname, './data/customers.json');
const orders_json_file_path = path.join(__dirname, './data/orders.json');
const products_json_file_path = path.join(__dirname, './data/products.json');

function loadJsonFile<T>(filePath: string): T[] {
  try {
    const data = readFileSync(filePath, { encoding: 'utf8' });
    return JSON.parse(data) as T[];
  } catch (error) {
    const err = error as Error;
    console.error(`Error reading or parsing file: ${filePath}`, error);
    throw new Error(err.message);
  }
}

const customers_data = loadJsonFile<ICustomer>(customers_json_file_path).map(
  (customer) => {
    const new_customer = new Customer(customer);
    return new CustomerModel(new_customer);
  },
);

const products_data = loadJsonFile<IProduct>(products_json_file_path).map(
  (product) => {
    const new_product = new Product(product);
    return new ProductModel(new_product);
  },
);

const orders_data = loadJsonFile<Order>(orders_json_file_path).map((order) => {
  const new_order = new Order(order);
  return new OrderModel(new_order);
});

export async function Seed(): Promise<void> {
  const session = await startSession();
  session.startTransaction();

  await CustomerModel.bulkWrite(
    customers_data.map((customer) => ({
      updateOne: {
        filter: { _id: customer._id },
        update: { $set: customer },
        upsert: true,
      },
    })),
    { session },
  );

  await ProductModel.bulkWrite(
    products_data.map((product) => ({
      updateOne: {
        filter: { _id: product._id },
        update: { $set: product },
        upsert: true,
      },
    })),
    { session },
  );

  await OrderModel.bulkWrite(
    orders_data.map((order) => ({
      updateOne: {
        filter: { _id: order._id },
        update: { $set: order },
        upsert: true,
      },
    })),
    { session },
  );

  await session.commitTransaction();
  console.log('Upsert transaction committed successfully.');
}
