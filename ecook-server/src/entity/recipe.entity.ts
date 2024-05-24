import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
}
