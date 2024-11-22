import { Entity, Column, BeforeInsert, ManyToMany } from "typeorm";
import bcrypt from "bcryptjs";
import { BaseSchema } from "@shared/database/entities/BaseEntity";
import { Role } from "./Role";

@Entity()
export class User extends BaseSchema {
  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255, unique: true, nullable: true })
  email: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
