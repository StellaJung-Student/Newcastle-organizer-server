import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import Project from './Project';

@Entity()
export default class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  color: string;

  @ManyToOne(() => Project, (project) => project.tags)
  project: Project;

  constructor(title: string, color: string) {
    this.title = title;
    this.color = color;
  }
}
