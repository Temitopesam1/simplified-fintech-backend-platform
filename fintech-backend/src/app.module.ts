import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Kyc } from './kyc/kyc.entity';
import { KycModule } from './kyc/kyc.module';
import { LogsModule } from './logs/logs.module';


@Module({
imports: [
ConfigModule.forRoot({ isGlobal: true }),
TypeOrmModule.forRoot({
type: 'mysql',
host: process.env.DB_HOST,
port: parseInt(process.env.DB_PORT || '3306', 10),
username: process.env.DB_USERNAME,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
entities: [User, Kyc],
synchronize: false, // use migrations in prod (set true temporarily if needed)
}),
MongooseModule.forRoot(process.env.MONGO_URI || "mongodb://localhost:27017/fintech", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
UsersModule,
AuthModule,
KycModule,
LogsModule,
],
controllers: [],
providers: [],
})


export class AppModule {}