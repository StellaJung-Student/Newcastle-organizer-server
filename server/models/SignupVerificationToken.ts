import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from './User';

@Entity()
export default class SignupVerificationToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: String;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
