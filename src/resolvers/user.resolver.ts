import { User } from '@models/user.schema';
import { UserService } from '@services/user.service';
import { inject, injectable } from 'inversify';
import { TYPES } from '@ioc/types';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { CreateUserInput } from '@dto/create-user.input';
import { UpdateUserInput } from '@dto/update-user.input';

@Resolver()
@injectable()
export class UserResolver {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Query(() => User)
  async user(@Arg('id', () => String) id: string): Promise<User> {
    return await this.userService.findById(id);
  }

  @Mutation(() => User)
  async createUser(@Arg('data', () => CreateUserInput) data: CreateUserInput): Promise<User> {
    const user = await this.userService.create(data);
    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Arg('id', () => String) id: string,
    @Arg('data', () => UpdateUserInput) data: UpdateUserInput,
  ): Promise<User> {
    const user = await this.userService.update(id, data);
    return user;
  }

  @Mutation(() => String)
  async deleteUser(@Arg('id', () => String) id: string): Promise<string> {
    await this.userService.delete(id);
    return id;
  }
}
