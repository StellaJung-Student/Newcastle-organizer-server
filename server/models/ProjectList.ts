import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Task from './Task';
import Project from './Project';

@Entity()
export default class ProjectList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Project, (project) => project.projectLists, { onDelete: 'CASCADE' })
  project: Project;

  @OneToMany(() => Task, (task) => task.projectList)
  tasks: Task[];
}
