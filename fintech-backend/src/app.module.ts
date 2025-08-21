import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppDataSource } from './data-source';
import { KycModule } from './kyc/kyc.module';
import { LogsModule } from './logs/logs.module';


@Module({
imports: [
ConfigModule.forRoot({ isGlobal: true }),
TypeOrmModule.forRoot({
    ...AppDataSource.options
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