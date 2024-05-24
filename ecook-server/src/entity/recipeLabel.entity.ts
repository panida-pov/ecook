import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "recipe_label" })
export class LabelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "recipe_id" })
  recipeId: number;

  @Column({ name: "label_id" })
  labelId: number;
}
