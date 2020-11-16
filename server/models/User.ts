import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  googleId: string;

  @Column({ nullable: true })
  facebookId: string;

  constructor(name: string, email: string, password: string, googleId: string, facebookId: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.googleId = googleId;
    this.facebookId = facebookId;
  }
}
