import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
// import { RedisResolver } from './redis.resolver';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    RedisModule.forRoot({
      type: 'single',
      url: 'redis://localhost:6379',
      // options: {
      //   password: 'password',
      // },
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisCacheModule {}
