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

@Entity()
export default class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column()
  imageUrl: string;

  @Column()
  publicStatus: boolean;

  @OneToMany(() => Tag, (tag) => tag.id)
  tags: Tag[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  owner: User;

  @ManyToMany(() => User)
  @JoinTable({ name: 'project_members' })
  members: User[];

  constructor(title: string, description: string, imageUrl: string, publicStatus: boolean, tags: Tag[]) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.publicStatus = publicStatus;
    this.tags = tags;
  }
}
