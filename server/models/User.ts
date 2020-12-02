import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Project from './Project';

@Entity()
export default class Users {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  googleId: string;

  @Column({ nullable: true })
  facebookId: string;

  @OneToMany((type) => Project, (project) => project.owner)
  projects: Project[];

  @Column({ default: false })
  isEnabled: Boolean;

  @Column({ default: false })
  isAccountExpired: Boolean;

  @Column({ default: false })
  isBanned: Boolean;

  constructor(
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    username: string,
    googleId: string,
    facebookId: string
    // isEnabled: Boolean,
    // isAccountExpired: Boolean,
    // isBanned: Boolean
  ) {
    this.email = email;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.googleId = googleId;
    this.facebookId = facebookId;
    // this.isEnabled = isEnabled;
    // this.isAccountExpired = isAccountExpired;
    // this.isBanned = isBanned;
  }
}
