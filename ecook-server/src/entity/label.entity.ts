import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { RecipeLabelEntity } from "./recipeLabel.entity";

@Entity({ name: "labels" })
export class LabelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => RecipeLabelEntity, (recipeLabel) => recipeLabel.label)
  recipeLabels: RecipeLabelEntity[];
}
