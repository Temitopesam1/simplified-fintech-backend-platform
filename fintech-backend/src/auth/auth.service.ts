import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User, UserRole } from '../users/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { RefreshToken } from './refresh-token.entity';


@Injectable()
export class AuthService {
constructor(
private usersService: UsersService,
private jwtService: JwtService,
@InjectRepository(RefreshToken)
private refreshRepo: Repository<RefreshToken>,
) {}


async register(email: string, password: string) {
const existing = await this.usersService.findByEmail(email);
if (existing) throw new BadRequestException('Email already in use');
const hashed = await bcrypt.hash(password, 10);
const verificationToken = uuidv4();
const user = await this.usersService.create(email, hashed, [UserRole.USER], false, verificationToken);


// simulate email verification by logging the verification URL
console.log(`Verification URL: http://localhost:${process.env.PORT || 3000}/auth/verify?token=${verificationToken}`);


return this.buildAuthPayload(user, false);
}


async verifyEmail(token: string) {
const user = await this.usersService.findByVerificationToken(token);
if (!user) throw new NotFoundException('Invalid verification token');
user.isEmailVerified = true;
user.verificationToken = "";
await this.usersService.save(user);
return { message: 'Email verified' };
}


async validateUser(email: string, pass: string): Promise<User> {
const user = await this.usersService.findByEmail(email);
if (!user) throw new UnauthorizedException('Invalid credentials');
const matched = await bcrypt.compare(pass, user.password);
if (!matched) throw new UnauthorizedException('Invalid credentials');
if (!user.isEmailVerified) throw new UnauthorizedException('Email not verified');
return user;
}


async login(email: string, password: string) {
  const user = await this.validateUser(email, password);

  const refreshToken = uuidv4();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const rt = this.refreshRepo.create({ token: refreshToken, userId: user.id, expiresAt });
  await this.refreshRepo.save(rt);

  return {
    ...this.buildAuthPayload(user, true),
    refreshToken,
  };
}


buildAuthPayload(user: User, includeAccess = true) {
const payload = { sub: user.id, email: user.email, roles: user.roles };
return {
accessToken: includeAccess ? this.jwtService.sign(payload) : null,
user: { id: user.id, email: user.email, roles: user.roles },
};
}

async refresh(token: string) {
const found = await this.refreshRepo.findOne({ where: { token } });
if (!found) throw new UnauthorizedException('Invalid refresh token');
if (found.expiresAt < new Date()) {
await this.refreshRepo.delete(found.id);
throw new UnauthorizedException('Refresh token expired');
}
const user = await this.usersService.findById(found.userId);
if (!user) throw new UnauthorizedException('User not found');
return this.buildAuthPayload(user, true);
}


async logoutRefresh(token: string) {
await this.refreshRepo.delete({ token });
}
}