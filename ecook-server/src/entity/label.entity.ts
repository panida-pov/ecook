import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "labels" })
export class LabelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
