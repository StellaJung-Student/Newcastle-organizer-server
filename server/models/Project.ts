import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';
import Tag from './Tag';

@Entity()
export default class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @Column()
  status: string;

  @OneToMany(() => Tag, (tag) => tag.id)
  tags: Tag[];
}
