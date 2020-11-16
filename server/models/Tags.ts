import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Tags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  constructor(name: string) {
    this.name = name;
  }
}
