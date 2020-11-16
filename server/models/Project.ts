import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import Tag from './Tag';

@Entity()
export default class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @ManyToMany(() => Tag)
  tags: Tag[];
}
