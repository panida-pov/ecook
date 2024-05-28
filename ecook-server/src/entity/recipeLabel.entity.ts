import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { LabelEntity } from "./label.entity";
import { RecipeEntity } from "./recipe.entity";

@Entity({ name: "recipe_label" })
export class RecipeLabelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "recipe_id" })
  recipeId: number;

  @Column({ name: "label_id" })
  labelId: number;

  @ManyToOne(() => LabelEntity, (label) => label.recipeLabels)
  @JoinColumn({ name: "label_id", referencedColumnName: "id" })
  label: LabelEntity;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.recipeLabels)
  @JoinColumn({ name: "recipe_id", referencedColumnName: "id" })
  recipe: RecipeEntity;
}
