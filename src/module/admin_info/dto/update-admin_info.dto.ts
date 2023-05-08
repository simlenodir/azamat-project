import { PartialType } from '@nestjs/swagger';
import { CreateAdminInfoDto } from './create-admin_info.dto';

export class UpdateAdminInfoDto extends PartialType(CreateAdminInfoDto) {}
