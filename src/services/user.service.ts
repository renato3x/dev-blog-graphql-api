import { User } from "@models/user.schema";
import { UserRepository } from "@repositories/user.repository";
import { inject, injectable } from "inversify";
import { TYPES } from "@ioc/types";
import { CreateUserInput } from "@dto/create-user.input";
import { HashService } from "./hash.service";

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

  async create(data: CreateUserInput): Promise<User> {
    const hash = HashService.createHash(data.password);
    const user = await this.userRepository.create({
      ...data,
      password: hash,
    });

    const { password, ...publicUser } = user;

    return publicUser;
  }
}
