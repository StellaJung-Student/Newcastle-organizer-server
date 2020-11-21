import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Comment from './Comment';
import Project from './Project';

@Entity()
export default class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true, default: '' })
  description: string;

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;

  @OneToMany(() => Comment, (comment) => comment.id)
  comments: Comment[];

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}
