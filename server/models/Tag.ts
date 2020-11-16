import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  color: string;

  constructor(title: string, color: string) {
    this.title = title;
    this.color = color;
  }
}
