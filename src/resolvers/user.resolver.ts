import { User } from '@models/user.schema';
import { UserService } from '@services/user.service';
import { inject, injectable } from 'inversify';
import { TYPES } from '@ioc/types';
import { Query, Resolver } from 'type-graphql';

@Resolver()
@injectable()
export class UserResolver {
  constructor(
    @inject(TYPES.UserService) private userService: UserService
  ) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await this.userService.findAll();
  }
}
