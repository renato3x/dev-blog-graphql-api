export interface IRepository<T, ID, Key extends keyof T> {
  findAll(): Promise<T[]>;
  findById(id: ID): Promise<T | null>;
  create(data: Omit<T, Key>): Promise<T>;
  update(id: ID, data: Omit<T, Key>): Promise<T>;
  delete(id: ID): Promise<void>;
}
