import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "ingredients" })
export class IngredientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  amount: number;

  @Column()
  unit: string;

  @Column({ name: "recipe_id" })
  recipeId: number;
}
