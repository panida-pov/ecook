import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { RecipeEntity } from "./recipe.entity";

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

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.ingredients)
  @JoinColumn({ name: "recipe_id", referencedColumnName: "id" })
  recipe: RecipeEntity;
}
