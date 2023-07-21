import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  name: string = "";

  @Column()
  description: string = "";

  @Column()
  filename: string = "";

  @Column()
  views: number = 0;

  @Column()
  isPublished: boolean = false;

  @Column()
  newColumn: string = "";
}
