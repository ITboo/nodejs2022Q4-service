import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

import { AppModule } from './app/app.module';

import { SwaggerModule } from '@nestjs/swagger';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';

dotenv.config();
const PORT = process.env.port || 4000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  //Swagger
  const rootDir = dirname(__dirname);
  const api = await readFile(join(rootDir, 'doc', 'api.yaml'), 'utf-8');
  const docApi = parse(api);
  SwaggerModule.setup('doc', app, docApi);

  await app.listen(PORT, () => console.log('Server started on port' + PORT));
}
bootstrap();
