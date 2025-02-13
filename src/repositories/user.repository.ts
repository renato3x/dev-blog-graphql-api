import { User } from '@prisma/client';
import { IRepository } from './repository.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '@ioc/types';
import { PrismaClient } from '@prisma/client';

@injectable()
export class UserRepository implements IRepository<User, string, 'id' | 'createdAt' | 'updatedAt'> {
  constructor(@inject(TYPES.DatabaseClient) private client: PrismaClient) {}

  async findAll(): Promise<User[]> {
    return await this.client.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    return await this.client.user.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return await this.client.user.create({ data });
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    return await this.client.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.client.user.delete({
      where: {
        id,
      },
    });
  }
}
