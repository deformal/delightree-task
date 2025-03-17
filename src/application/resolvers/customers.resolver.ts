import { Args, Mutation, Query, Resolver } from 'type-graphql';
import { CustomerServices } from '../services/customers/customers.service';
import {
  CreateCustomerArgs,
  CustomerOrders,
  CustomersDTO,
  DeleteCustomerArgs,
  GetCustomerArgs,
  GetCustomerOrdersArgs,
  UpdateCustomerArgs,
} from '../dto/customers.dto';
import { GeneralResponse } from '../dto/general.dto';

@Resolver()
export class CustomerResolver {
  private readonly customerService: CustomerServices = new CustomerServices();

  @Query(() => CustomersDTO)
  async getCustomer(@Args() args: GetCustomerArgs): Promise<CustomersDTO> {
    return await this.customerService.getCustomer(args);
  }

  @Mutation(() => GeneralResponse)
  async createCustomer(
    @Args() args: CreateCustomerArgs,
  ): Promise<GeneralResponse> {
    return await this.customerService.createCustomer(args);
  }

  @Mutation(() => GeneralResponse)
  async updateCustomer(
    @Args() args: UpdateCustomerArgs,
  ): Promise<GeneralResponse> {
    return await this.customerService.updateCustomer(args);
  }

  @Mutation(() => GeneralResponse)
  async deleteCustomer(
    @Args() args: DeleteCustomerArgs,
  ): Promise<GeneralResponse> {
    return await this.customerService.deleteCustomer(args);
  }

  @Query(() => CustomerOrders)
  async getCustomerOrders(
    @Args() args: GetCustomerOrdersArgs,
  ): Promise<CustomerOrders> {
    return await this.customerService.getCustomerOrders(args);
  }
}
