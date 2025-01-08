import { User } from '@models/user.schema';
import { UserService } from '@services/user.service';
import { Query, Resolver } from 'type-graphql';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return [];
  }
}
