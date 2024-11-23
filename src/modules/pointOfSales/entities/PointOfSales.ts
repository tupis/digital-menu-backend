import { Entity, Column } from "typeorm";
import { BaseSchema } from "@shared/database/entities/BaseEntity";

@Entity()
export class PointOfSales extends BaseSchema {
  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  description: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  image: string;

  @Column({ type: "boolean", default: false })
  isPub: boolean;
}
