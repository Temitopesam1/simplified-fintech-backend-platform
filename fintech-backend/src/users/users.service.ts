import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
  ) {}

  /**
   * Create new user
   */
  async create(
    email: string,
    password: string,
    roles: UserRole[] = [UserRole.USER],
    isEmailVerified = false,
    verificationToken: string,
  ): Promise<User> {
    // const existing = await this.usersRepo.findOne({ where: { email } });
    // if (existing) throw new ConflictException('Email already in use');

    const user = this.usersRepo.create({
      email,
      password,
      roles,
      isEmailVerified,
      verificationToken,
    });

    return this.usersRepo.save(user);
  }

  async save(user: User): Promise<User> {
    return this.usersRepo.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { id } });
  }

  async findByVerificationToken(token: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { verificationToken: token } });
  }

  async updateProfile(id: string, updates: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');
    Object.assign(user, updates);
    return this.usersRepo.save(user);
  }

  async updateRole(id: string, role: string): Promise<User> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');
    user.roles = [role];
    return this.usersRepo.save(user);
  }
}
