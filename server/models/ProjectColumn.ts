import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class ProjectColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}
