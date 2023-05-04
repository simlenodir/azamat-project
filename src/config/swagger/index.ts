import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('PentaGOL projects')
  .setVersion('1.0')
  .build();
