import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  biography: string | null;

  @Field(() => String, { nullable: true })
  profileImage: string | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
