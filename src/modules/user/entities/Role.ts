import { Entity, Column, ManyToMany, JoinTable } from "typeorm";
import { BaseSchema } from "@shared/database/entities/BaseEntity";
import { User } from "./User";

@Entity()
export class Role extends BaseSchema {
  @Column({ type: "varchar", length: 255, unique: true })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "boolean", default: false })
  isFixed: boolean;

  @ManyToMany(() => User, (user) => user.roles)
  @JoinTable()
  users: User[];
}
