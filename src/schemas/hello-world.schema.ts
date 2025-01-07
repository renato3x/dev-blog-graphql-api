import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class HelloWorld {
  @Field(() => String)
  message: string;
}
