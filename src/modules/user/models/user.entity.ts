// @Entity()
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    comment: '昵称',
    default: '',
  })
  @IsNotEmpty()
  name: string;

  @Column({
    comment: '描述',
    default: '',
  })
  desc: string;

  @Column({
    comment: '手机号',
    nullable: true, //在数据库层可以为空
  })
  tel: string;

  @Column({
    comment: '邮箱',
    default: '',
  })
  email: string;

  @Column({
    comment: '密码',
    select: false, //在查询时，不返回该字段
    nullable: true, //在数据库层可以为空
  })
  password: string;

  @Column({
    comment: '账户信息',
    nullable: true, //在数据库层可以为空
  })
  account: string;

  // 验证码
  @Column({
    comment: '验证码',
    nullable: true, //在数据库层可以为空
  })
  code: string;

  // 验证码过期时间
  @Column({
    comment: '验证码过期时间',
    nullable: true, //在数据库层可以为空
  })
  codeExpire: string;
}
