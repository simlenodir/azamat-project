import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateAdminDto {
  @IsString()
  @Length(1, 100)
  @IsOptional()
  @ApiProperty({
    name: 'email',
    type: 'string',
    default: 'admin@gmail.com',
    required: false,
  })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'password',
    type: 'string',
    default: '1a3s4ftf',
    required: false,
  })
  password: string;

  @IsString()
  @ApiProperty({
      name: 'telegram',
      type: 'string',
      default: 'https://t.me/sma1lov_@com',
      required: false,
    })
    @IsOptional()
  telegram: string;

  @IsString()
  @ApiProperty({
    name: 'instagram',
    type: 'string',
    default: 'https://t.me/sma1lov_@com',
    required: false,
  })
  @IsOptional()
  instagram: string;

  @IsString()
  @ApiProperty({
    name: 'twitter',
    type: 'string',
    default: 'https://t.me/sma1lov_@com',
    required: false,
  })
  @IsOptional()
  twitter: string;

  @IsString()
  @ApiProperty({
    name: 'facebook',
    type: 'string',
    default: 'https://t.me/sma1lov_@com',
    required: false,
  })
  @IsOptional()
  facebook: string;

  @IsString()
  @ApiProperty({
    name: 'youtube',
    type: 'string',
    default: 'https://t.me/sma1lov_@com',
    required: false,
  })
  @IsOptional()
  youtube: string;

  @IsBoolean()
  @ApiProperty({
    name: 'isActive',
    type: 'boolean',
    default: true,
    required: false,
  })
  @IsOptional()
  isaActive: boolean;
}
