import bcrypt from 'bcrypt';

export class HashService {
  static createHash(data: string) {
    return bcrypt.hashSync(data, 10);
  }
}
