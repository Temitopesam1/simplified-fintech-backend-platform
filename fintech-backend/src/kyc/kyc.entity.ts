import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';


@Entity({ name: 'kyc' })
export class Kyc {
@PrimaryGeneratedColumn('uuid')
id!: string;


@Column()
fullName!: string;


@Column({ type: 'date', nullable: true })
dob!: string;


@Column({ nullable: true })
address!: string;


@Column({ nullable: true })
idType!: string;


@Column({ nullable: true })
idNumber!: string;


@ManyToOne(() => User)
@JoinColumn({ name: 'userId' })
user!: User;


@Column()
userId!: string;
}