import { Entity, Column, BeforeInsert } from "typeorm";
import bcrypt from "bcryptjs";
import { BaseSchema } from "@shared/database/entities/BaseEntity";

@Entity()
export class User extends BaseSchema {
  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
