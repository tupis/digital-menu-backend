import { Role } from "@modules/user/entities/Role";
import { Logger } from "@shared/logger";
import { DataSource } from "typeorm";

export async function seedRoles(dataSource: DataSource): Promise<void> {
  const roleRepo = dataSource.getRepository(Role);

  const fixedRoles = [
    { name: "admin", description: "Acesso total ao sistema", isFixed: true },
    {
      name: "manager",
      description: "Acesso avancado ao sistema",
      isFixed: true,
    },
    {
      name: "waiter",
      description: "Acesso básico ao sistema",
      isFixed: true,
    },
  ];

  for (const fixedRole of fixedRoles) {
    const existingRole = await roleRepo.findOne({
      where: { name: fixedRole.name },
    });
    if (!existingRole) {
      const role = roleRepo.create(fixedRole);
      await roleRepo.save(role);
      Logger.log({
        level: "warn",
        message: `Cargo ${fixedRole.name} criado.`,
      });
    }
  }
}
