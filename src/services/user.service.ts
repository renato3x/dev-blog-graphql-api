import { User } from '@models/user.schema';
import { UserRepository } from '@repositories/user.repository';
import { inject, injectable } from 'inversify';
import { TYPES } from '@ioc/types';
import { CreateUserInput } from '@dto/create-user.input';
import { HashService } from './hash.service';
import { ServerError } from '@errors/server.error';
import { UpdateUserInput } from '@dto/update-user.input';

@injectable()
export class UserService {
  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.findAll();

    return users.map((users) => {
      const { password: _password, ...publicUser } = users;
      return publicUser;
    });
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (user) {
      const { password: _password, ...publicUser } = user;
      return publicUser;
    }

    throw new ServerError('User not found', {
      code: 'USER_NOT_FOUND',
    });
  }

  async create(data: CreateUserInput): Promise<User> {
    const hash = HashService.createHash(data.password);
    const user = await this.userRepository.create({
      ...data,
      password: hash,
    });

    const { password: _password, ...publicUser } = user;

    return publicUser;
  }

  async update(id: string, data: UpdateUserInput): Promise<User> {
    const userExists = await this.userRepository.findById(id);

    if (userExists) {
      if (data.password) {
        data.password = HashService.createHash(data.password);
      }

      const user = await this.userRepository.update(id, data);
      const { password: _password, ...publicUser } = user;

      return publicUser;
    }

    throw new ServerError('User not found', {
      code: 'USER_NOT_FOUND',
    });
  }

  async delete(id: string): Promise<void> {
    const userExists = await this.userRepository.findById(id);

    if (userExists) {
      await this.userRepository.delete(id);
      return;
    }

    throw new ServerError('User not found', {
      code: 'USER_NOT_FOUND',
    });
  }
}
