import { PartialType } from '@nestjs/swagger';
import { CreatePoliticalDto } from './create-political.dto';

export class UpdatePoliticalDto extends PartialType(CreatePoliticalDto) {}
