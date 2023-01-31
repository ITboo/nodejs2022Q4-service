import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

const PORT = process.env.port || 4000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => console.log('Server started on port' + PORT));
}
bootstrap();
