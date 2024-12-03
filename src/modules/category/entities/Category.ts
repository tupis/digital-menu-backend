import { Entity, Column, ManyToOne, ManyToMany } from "typeorm";
import { BaseSchema } from "@shared/database/entities/BaseEntity";
import { PointOfSales } from "@modules/pointOfSales/entities/PointOfSales";
import { Product } from "@modules/products/entities/Product";

@Entity()
export class Category extends BaseSchema {
  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  image: string;

  @ManyToOne(() => PointOfSales, (pointOfSales) => pointOfSales.category, {
    nullable: false,
    cascade: true,
  })
  pointOfSales: PointOfSales;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];

  @Column({ type: "boolean", default: true })
  active: boolean;
}
