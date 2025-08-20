import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../common/jwt.strategy';


@Module({
imports: [
UsersModule,
TypeOrmModule.forFeature([User]),
PassportModule,
JwtModule.register({
secret: process.env.JWT_SECRET || 'supersecret_jwt_key',
signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '3600s' },
}),
],
providers: [AuthService, JwtStrategy],
controllers: [AuthController],
})
export class AuthModule {}