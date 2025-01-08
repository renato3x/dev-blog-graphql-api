import { User } from "@models/user.schema";
import { UserRepository } from "@repositories/user.repository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findById(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    
    return users.map((users) => {
      const { password, ...publicUser } = users;
      return publicUser;
    });
  }
}
