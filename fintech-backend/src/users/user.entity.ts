import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


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


@Column({ type: 'simple-array', default: '' })
roles!: string[];


@Column({ type: 'json', nullable: true })
financialPreferences: any;


@Column({ nullable: true })
isEmailVerified!: boolean;
}