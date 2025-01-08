import { User } from '@models/user.schema';
import { Query, Resolver } from 'type-graphql';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return [];
  }
}
