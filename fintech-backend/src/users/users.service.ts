import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';


@Injectable()
export class UsersService {
constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}


async create(email: string, password: string, roles: UserRole[] = [UserRole.USER]) {
const user = this.usersRepo.create({ email, password, roles });
return this.usersRepo.save(user);
}


findByEmail(email: string) {
return this.usersRepo.findOneBy({ email });
}


findById(id: string) {
return this.usersRepo.findOneBy({ id });
}


async updateProfile(id: string, patch: Partial<User>) {
await this.usersRepo.update(id, patch);
return this.findById(id);
}
}