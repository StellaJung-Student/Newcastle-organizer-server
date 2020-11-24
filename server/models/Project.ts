import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Tag from './Tag';
import User from './User';
import ProjectList from './ProjectList';

@Entity()
export default class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column()
  publicStatus: boolean;

  @OneToMany(() => Tag, (tag) => tag.id)
  tags: Tag[];

  @OneToMany(() => ProjectList, (column) => column.id)
  projectLists: ProjectList[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  owner: User;

  @ManyToMany(() => User)
  @JoinTable({ name: 'project_members' })
  members: User[];

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  createdAt: Date;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  updatedAt: Date;

  constructor(title: string, description: string, imageUrl: string, publicStatus: boolean, tags: Tag[]) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.publicStatus = publicStatus;
    this.tags = tags;
  }
}
