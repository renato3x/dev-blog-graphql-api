import { User } from '@models/user.schema';
import { UserRepository } from '@repositories/user.repository';
import { inject, injectable } from 'inversify';
import { TYPES } from '@ioc/types';
import { CreateUserDto } from '@dto/create-user.dto';
import { HashService } from './hash.service';
import { ServerError } from '@errors/server.error';
import { UpdateUserDto } from '@dto/update-user.dto';
import { ErrorCodes } from '@enums/error-codes.enum';

@injectable()
export class UserService {
  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {}

  private removePassword(user: User & { password?: string }): User {
    const { password: _password, ...publicUser } = user;
    return publicUser;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users.map(this.removePassword);
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ServerError('User not found', ErrorCodes.NOT_FOUND);
    }

    return this.removePassword(user);
  }

  async create(data: CreateUserDto): Promise<User> {
    const hash = HashService.createHash(data.password);
    const user = await this.userRepository.create({
      ...data,
      password: hash,
    });

    return this.removePassword(user);
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const userExists = await this.userRepository.findById(id);

    if (!userExists) {
      throw new ServerError('User not found', ErrorCodes.NOT_FOUND);
    }

    if (data.password) {
      data.password = HashService.createHash(data.password);
    }

    const user = await this.userRepository.update(id, data);
    return this.removePassword(user);
  }

  async delete(id: string): Promise<void> {
    const userExists = await this.userRepository.findById(id);

    if (!userExists) {
      throw new ServerError('User not found', ErrorCodes.NOT_FOUND);
    }

    await this.userRepository.delete(id);
  }
}
