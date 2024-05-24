import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "methods" })
export class MethodEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  method: string;

  @Column({ name: "recipe_id" })
  recipeId: number;
}
