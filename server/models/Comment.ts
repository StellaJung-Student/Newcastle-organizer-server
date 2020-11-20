import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Task from './Task';

@Entity()
export default class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @ManyToOne(() => Task, (task) => task.comments)
  task: Task;
}
