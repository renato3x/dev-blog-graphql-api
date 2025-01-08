import { User } from '@prisma/client';
import { IRepository } from './repository.interface';
import { client } from '@database/client';
import { injectable } from 'inversify';

@injectable()
export class UserRepository implements IRepository<User, string, 'id'> {
  async findAll(): Promise<User[]> {
    return await client.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }

  async create(data: Omit<User, 'id'>): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async update(id: string, data: Omit<User, 'id'>): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

}
