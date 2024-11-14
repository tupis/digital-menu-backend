import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "@shared/database/dataSource";

export class UserRepository extends Repository<User> {
  constructor() {
    super(User, AppDataSource.manager);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }
}
