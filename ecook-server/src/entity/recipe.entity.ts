import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { RecipeLabelEntity } from "./recipeLabel.entity";
import { IngredientEntity } from "./ingredient.entity";
import { MethodEntity } from "./method.entity";

@Entity({ name: "recipes" })
export class RecipeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  favorite: boolean;

  @Column()
  servings: number;

  @OneToMany(() => RecipeLabelEntity, (recipeLabel) => recipeLabel.recipe)
  recipeLabels: RecipeLabelEntity[];

  @OneToMany(() => IngredientEntity, (ingredient) => ingredient.recipe)
  ingredients: IngredientEntity[];

  @OneToOne(() => MethodEntity)
  @JoinColumn({ name: "id", referencedColumnName: "id" })
  method: MethodEntity;
}
