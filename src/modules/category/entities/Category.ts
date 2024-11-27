import { Entity, Column, ManyToOne } from "typeorm";
import { BaseSchema } from "@shared/database/entities/BaseEntity";
import { PointOfSales } from "@modules/pointOfSales/entities/PointOfSales";

@Entity()
export class Category extends BaseSchema {
  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  image: string;

  @ManyToOne(() => PointOfSales, (pointOfSales) => pointOfSales.category)
  pointOfSales: PointOfSales;
}
