import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class GeneralResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  message: string;
}
