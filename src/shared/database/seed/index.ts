import { DataSource } from "typeorm";
import { seedRoles } from "./role.seed";
import { seedUserAdmin } from "./user.admin";

export async function executeSeed(dataSource: DataSource): Promise<void> {
  await seedRoles(dataSource);
  await seedUserAdmin(dataSource);
}
