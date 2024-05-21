import { Page } from './page.type';
import { ClassType, Field, Int, ObjectType } from 'type-graphql';

interface IResult<T> {
  // 状态码
  code: number;
  // 消息
  message: string;
  // 数据
  data?: T;
}

interface IResults<T> {
  // 状态码
  code: number;
  // 消息
  message: string;
  // 数据
  data?: T[];
  page?: Page;
}

export function createResult<T extends object>(
  ItemType: ClassType<T>,
): ClassType<IResult<T>> {
  @ObjectType()
  class Result {
    @Field(() => Int)
    code: number;

    @Field(() => String)
    message: string;

    @Field(() => ItemType, { nullable: true })
    data?: T;
  }

  return Result;
}

export function createResults<T extends object>(
  ItemTypes: ClassType<T>,
): ClassType<IResults<T>> {
  @ObjectType()
  class Results {
    @Field(() => Int)
    code: number;

    @Field(() => String)
    message: string;

    @Field(() => ItemTypes, { nullable: true })
    data?: T[];

    @Field(() => Page, { nullable: true })
    page?: Page;
  }

  return Results;
}

@ObjectType()
export class Result {
  @Field(() => Int)
  code: number;

  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => String, { nullable: true })
  data?: string;
}
