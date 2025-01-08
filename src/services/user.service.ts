import { User } from "@models/user.schema";
import { UserRepository } from "@repositories/user.repository";
import { inject, injectable } from "inversify";
import { TYPES } from "@ioc/types";

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    
    return users.map((users) => {
      const { password, ...publicUser } = users;
      return publicUser;
    });
  }
}
