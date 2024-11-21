import { Entity, Column, ManyToOne } from "typeorm";
import { BaseSchema } from "@shared/database/entities/BaseEntity";
import { Product } from "./Product";

@Entity()
export class ProductOptional extends BaseSchema {
  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "float", default: 0 })
  additionalPrice: number;

  @ManyToOne(() => Product, (product) => product.optionals, {
    onDelete: "CASCADE",
  })
  product: Product;
}
