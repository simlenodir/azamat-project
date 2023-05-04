import { PartialType } from '@nestjs/swagger';
import { CreateMainNewDto } from './create-main-new.dto';

export class UpdateMainNewDto extends PartialType(CreateMainNewDto) {}
