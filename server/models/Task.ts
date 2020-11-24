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

  @Column('character varying', { array: true, nullable: true })
  labels: string[];

  @Column('character varying', { array: true, nullable: true })
  attachments: string[];

  @Column({ type: 'date', nullable: false })
  deadlineDate: string;

  @ManyToOne(() => ProjectList, (projectList) => projectList.tasks, { onDelete: 'CASCADE' })
  projectList: ProjectList;

  @OneToMany(() => Comment, (comment) => comment.task)
  comments: Comment[];

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}
