import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Tags from './Tags';

@Entity()
export default class Projects {
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

  @OneToMany(() => Tags, (tag) => tag.id)
  tags: Tags[];
}
