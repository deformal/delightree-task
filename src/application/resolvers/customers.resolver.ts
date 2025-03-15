import { ICustomer } from '@delightree-task-models/customer.schema';
import { Args, Query, Resolver } from 'type-graphql';
import { CustomerServices } from '../services/customers/customers.service';
import { CustomersDTO, GetCustomerOptionsDTO } from '../dto/customers.dto';

@Resolver()
export class CustomerResolver {
  private readonly customerService: CustomerServices = new CustomerServices();

  @Query(() => [CustomersDTO])
  async getAllCustomers(): Promise<Array<ICustomer>> {
    return await this.customerService.getAllCustomers();
  }

  @Query(() => CustomersDTO)
  async getCustomer(
    @Args() options: GetCustomerOptionsDTO,
  ): Promise<ICustomer> {
    return await this.customerService.getCustomer(options);
  }
}
