import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', //数据库类型
      host: 'localhost', //据库服务器地址
      port: 3307, //数据库服务器的端口号
      username: 'root', //数据库用户名
      password: 'example', //数据库密码
      database: 'test', //数据库名称
      entities: [`${__dirname}/../modules/**/*.entity{.ts,.js}`], // 指定实体文件路径，这里是当前目录下的modules文件夹下的所有实体文件
      logging: true, //是否记录日志，这里是开启状态
      autoLoadEntities: true, //是否自动加载实体，这里是开启状态
      synchronize: true, //是否自动同步数据库，这里是开启状态
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    // 导入其他模块
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
