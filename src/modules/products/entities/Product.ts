import { Entity, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { BaseSchema } from "@shared/database/entities/BaseEntity";
import { ProductOptional } from "./ProductOptional";
import { Category } from "@modules/category/entities/Category";

@Entity()
export class Product extends BaseSchema {
  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "text" })
  image: string;

  @Column({ type: "float" })
  price: number;

  @Column({ type: "boolean", default: true })
  active: boolean;

  @OneToMany(() => ProductOptional, (optional) => optional.product)
  optionals: ProductOptional[];

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  categories: Category[];
}
