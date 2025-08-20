import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kyc } from './kyc.entity';
import { CreateKycDto } from './dto/create-kyc.dto';
import { UsersService } from '../users/users.service';


@Injectable()
export class KycService {
constructor(
@InjectRepository(Kyc) private kycRepo: Repository<Kyc>,
private usersService: UsersService,
) {}


async createForUser(userId: string, dto: CreateKycDto) {
const user = await this.usersService.findById(userId);
if (!user) throw new NotFoundException('User not found');


const kyc = this.kycRepo.create({ ...dto, userId });
const saved = await this.kycRepo.save(kyc);


// attach to user by updating user record (kycId optional)
await this.usersService.updateProfile(userId, { /* could store kycId if desired */ });


return saved;
}
}