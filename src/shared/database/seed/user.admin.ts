import { Role } from "@modules/user/entities/Role";
import { User } from "@modules/user/entities/User";
import { Logger } from "@shared/logger";
import { DataSource } from "typeorm";

export async function seedUserAdmin(dataSource: DataSource): Promise<void> {
  const roleRepo = dataSource.getRepository(Role);
  const userRepo = dataSource.getRepository(User);

  const adminRole = await roleRepo.findOne({ where: { name: "admin" } });

  const existingAdmin = await userRepo.findOne({
    where: { email: "admin" },
  });

  if (!existingAdmin) {
    const userAdmin = userRepo.create({
      name: "Admin",
      email: "admin",
      password: "123456",
      roles: [adminRole!],
    });

    await userRepo.save(userAdmin);

    Logger.log({
      level: "warn",
      message: "Usuário admin criado.",
    });
  }
}
