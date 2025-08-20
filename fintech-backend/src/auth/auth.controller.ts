import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { UsersService } from '../users/users.service';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
constructor(private authService: AuthService, private usersService: UsersService) {}


@Post('register')
async register(@Body() body: RegisterDto) {
return this.authService.register(body.email, body.password);
}


@Post('login')
async login(@Body() body: LoginDto) {
return this.authService.login(body.email, body.password);
}


@Post('refresh')
async refresh(@Body('token') token: string) {
return this.authService.refresh(token);
}


@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Get('profile')
async profile(@Req() req: Request) {
const userId = (req.user as any).sub;
return this.usersService.findById(userId);
}


@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Put('profile')
async updateProfile(@Req() req: Request, @Body() patch: any) {
const userId = (req.user as any).sub;
return this.usersService.updateProfile(userId, patch);
}
}