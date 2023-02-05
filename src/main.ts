import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
//import { SwaggerModule } from '@nestjs/swagger';

const PORT = process.env.port || 4000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //SwaggerModule.setup('doc', app, document);
  await app.listen(PORT, () => console.log('Server started on port' + PORT));
}
bootstrap();
