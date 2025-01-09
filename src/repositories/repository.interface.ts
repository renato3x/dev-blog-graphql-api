export interface IRepository<T, ID, Keys extends keyof T> {
  findAll(): Promise<T[]>;
  findById(id: ID): Promise<T | null>;
  create(data: Omit<T, Keys>): Promise<T>;
  update(id: ID, data: Partial<T>): Promise<T>;
  delete(id: ID): Promise<void>;
}
