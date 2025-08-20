import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateKycDto } from './dto/create-kyc.dto';
import { KycService } from './kyc.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { Request } from 'express';


@ApiTags('auth')
@Controller('auth')
export class KycController {
constructor(private kycService: KycService) {}


@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Post('kyc')
async postKyc(@Req() req: Request, @Body() body: CreateKycDto) {
const userId = (req.user as any).sub;
return this.kycService.createForUser(userId, body);
}
}