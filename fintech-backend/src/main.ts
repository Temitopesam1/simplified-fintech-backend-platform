import { ValidationPipe, INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './logs/logging.interceptor';


async function bootstrap() {
dotenv.config();


const app: INestApplication = await NestFactory.create(AppModule);


app.useGlobalPipes(
new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
);


// Security middleware
app.use(helmet());
app.enableCors();
app.use(
rateLimit({ windowMs: 60 * 1000, max: 100 }), // 100 requests per minute
);


// Global interceptors
app.useGlobalInterceptors(new LoggingInterceptor());


const config = new DocumentBuilder()
.setTitle('Fintech API')
.setDescription('Personal finance platform API')
.setVersion('1.0')
.addBearerAuth()
.build();


const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);


await app.listen(process.env.PORT || 3000);
console.log(`🚀 Server running on http://localhost:${process.env.PORT || 3000}`);
console.log('📖 Swagger docs at /api');
}
bootstrap();