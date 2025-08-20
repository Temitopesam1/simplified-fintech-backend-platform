import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';


@Injectable()
export class AuthService {
constructor(private usersService: UsersService, private jwtService: JwtService) {}


async register(email: string, password: string) {
const existing = await this.usersService.findByEmail(email);
if (existing) throw new UnauthorizedException('Email already in use');
const hashed = await bcrypt.hash(password, 10);
const user = await this.usersService.create(email, hashed);
// simulate email verification by logging
console.log(`Send verification email to ${email}`);
return this.buildAuthPayload(user);
}


async validateUser(email: string, pass: string): Promise<User> {
  const user = await this.usersService.findByEmail(email);
  if (!user) {
    throw new UnauthorizedException('Invalid email or password');
  }

  const matched = await bcrypt.compare(pass, user.password);
  if (!matched) {
    throw new UnauthorizedException('Invalid email or password');
  }

  return user;
}



async login(email: string, password: string) {
const user = await this.validateUser(email, password);
if (!user) throw new UnauthorizedException('Invalid credentials');
return this.buildAuthPayload(user);
}


buildAuthPayload(user: User) {
const payload = { sub: user.id, email: user.email, roles: user.roles };
return {
accessToken: this.jwtService.sign(payload),
user: { id: user.id, email: user.email, roles: user.roles },
};
}


async refresh(token: string) {
try {
const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
const user = await this.usersService.findById(decoded.sub);
if (!user) throw new UnauthorizedException();
return this.buildAuthPayload(user);
} catch (err) {
throw new UnauthorizedException('Invalid refresh token');
}
}
}