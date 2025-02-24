import { User } from '@models/user.schema';
import { UserService } from '@services/user.service';
import { inject, injectable } from 'inversify';
import { TYPES } from '@ioc/types';
import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { CreateUserInput, CreateUserInputSchema } from '@dto/create-user.input';
import { UpdateUserInput } from '@dto/update-user.input';
import { InputValidationMiddleware } from '@middlewares/input-validation.middleware';

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
  @UseMiddleware(InputValidationMiddleware(CreateUserInputSchema, 'data'))
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
