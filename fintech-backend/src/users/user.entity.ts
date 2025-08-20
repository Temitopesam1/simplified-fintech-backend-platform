import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column({ unique: true })
    email!: string;

  @Column()
    password!: string;

  @Column("simple-array", { default: 'user' })
    roles!: string[];

  @Column({ type: 'json', nullable: true })
  financialPreferences: any;

  @Column({ default: false })
    isEmailVerified!: boolean;

  @Column({ nullable: true })
  verificationToken?: string;
}
