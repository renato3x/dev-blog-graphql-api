import { User } from '@prisma/client';
import { IRepository } from './repository.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '@ioc/types';
import { PrismaClient } from '@prisma/client';

@injectable()
export class UserRepository implements IRepository<User, string, 'id'> {
  constructor(
    @inject(TYPES.DatabaseClient) private client: PrismaClient
  ) {}

  async findAll(): Promise<User[]> {
    return await this.client.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }

  async create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return await this.client.user.create({ data });
  }

  async update(id: string, data: Omit<User, 'id'>): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

}
