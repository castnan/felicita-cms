import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@/resources/auth/auth.module';
import { JwtAuthGuard } from '@/resources/auth/guards/jwt-auth.guard';
import { UserModule } from '@/resources/user/user.module';
import { LoggerMiddleware } from '@/common/middlewares/logger.middleware';
import { FirstAccessMiddleware } from '@/common/middlewares/first-access.middleware';
import { JwtModule } from '@nestjs/jwt';
import { LogoutMiddleware } from './common/middlewares/logout.middleware';
import { ClothesModule } from './resources/clothes/clothes.module';
import { NestI18nModule } from './lib/i18n/i18n.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule,
    AuthModule,
    UserModule,
    NestI18nModule,
    ClothesModule,
  ],

})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer
      .apply(FirstAccessMiddleware)
      .exclude('*');
    consumer
      .apply(LogoutMiddleware)
      .exclude('*');
  
  }
}
