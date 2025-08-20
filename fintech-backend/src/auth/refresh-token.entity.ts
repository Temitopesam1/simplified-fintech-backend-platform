import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: 'refresh_tokens' })
export class RefreshToken {
@PrimaryGeneratedColumn('uuid')
id!: string;


@Column()
token!: string;


@Column()
userId!: string;


@Column({ type: 'datetime' })
expiresAt!: Date;
}