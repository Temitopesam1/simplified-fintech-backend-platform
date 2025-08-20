import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';


export class CreateKycDto {
@ApiProperty()
@IsNotEmpty()
@IsString()
fullName!: string;


@ApiProperty({ required: false })
@IsOptional()
@IsDateString()
dob?: string;


@ApiProperty({ required: false })
@IsOptional()
@IsString()
address?: string;


@ApiProperty({ required: false })
@IsOptional()
@IsString()
idType?: string;


@ApiProperty({ required: false })
@IsOptional()
@IsString()
idNumber?: string;
}