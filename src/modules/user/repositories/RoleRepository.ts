import { Repository } from "typeorm";
import { AppDataSource } from "@shared/database/dataSource";
import { Role } from "../entities/Role";
import { whereId } from "@utils/where-id";

export class RoleRepository extends Repository<Role> {
  constructor() {
    super(Role, AppDataSource.manager);
  }

  async findByName(name: string): Promise<Role | null> {
    return this.findOne({ where: { name } });
  }

  async findById(id: number | string): Promise<Role | null> {
    return this.findOne({ where: whereId(id) });
  }
}
