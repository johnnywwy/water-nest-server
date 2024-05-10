import { AuthService } from './auth.service';
import {
  Args,
  // Context,
  Mutation,
  // Query,
  Resolver,
} from '@nestjs/graphql';
import { Result } from './dto/auth.type';
// import { UserInput } from './dto/user-input.type';
// import { UserType } from './dto/user.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Result, { description: '发送邮箱验证码' })
  async sendEmailCode(@Args('email') email: string): Promise<Result> {
    const res = await this.authService.sendEmailCode(email);
    return res;
  }

  @Mutation(() => Result, { description: '登录' })
  async login(
    @Args('email') email: string,
    @Args('code') code: string,
  ): Promise<Result> {
    const res = await this.authService.login(email, code);
    return res;
  }

  // @Query(() => UserType, { description: '使用 ID 查询用户' })
  // async find(@Args('id') id: string): Promise<UserType> {
  //   return await this.authService.find(id);
  // }

  // @Query(() => UserType, { description: '更新用户' })
  // async update(
  //   @Args('id') id: string,
  //   @Args('params') params: UserInput,
  // ): Promise<boolean> {
  //   return await this.authService.update(id, params);
  // }

  // @Mutation(() => Boolean, { description: '删除用户' })
  // async delete(@Args('id') id: string): Promise<boolean> {
  //   return await this.authService.delete(id);
  // }
}
