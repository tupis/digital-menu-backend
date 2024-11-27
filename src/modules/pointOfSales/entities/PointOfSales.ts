import { Entity, Column, OneToMany } from "typeorm";
import { BaseSchema } from "@shared/database/entities/BaseEntity";
import { Category } from "@modules/category/entities/Category";

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

  @OneToMany(() => Category, (category) => category.pointOfSales)
  category: Category[];
}
