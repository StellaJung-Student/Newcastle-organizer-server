import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Comment from './Comment';
import ProjectList from './ProjectList';

@Entity()
export default class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true, default: '' })
  description: string;

  @ManyToOne(() => ProjectList, (projectList) => projectList.tasks)
  projectList: ProjectList;

  @OneToMany(() => Comment, (comment) => comment.id)
  comments: Comment[];

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}
