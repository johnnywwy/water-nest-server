import { Result } from '@/common/dto/result.type';
import { AuthService } from './auth.service';
import {
  Args,
  // Context,
  Mutation,
  // Query,
  Resolver,
} from '@nestjs/graphql';
import { StudentService } from '../student/student.service';
import {
  ACCOUNT_EXIST,
  ACCOUNT_NOT_EXIST,
  LOGIN_ERROR,
  REGISTER_ERROR,
  SUCCESS,
} from '@/common/constants/code';
import { accountAndPwdValidate } from '@/common/utils';

// import { UserInput } from './dto/user-input.type';
// import { UserType } from './dto/user.type';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly studentService: StudentService,
  ) {}

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

  @Mutation(() => Result, { description: '学员登录' })
  async studentLogin(
    @Args('account') account: string,
    @Args('password') password: string,
  ): Promise<Result> {
    const result = accountAndPwdValidate(account, password);
    if (result.code !== SUCCESS) {
      return result;
    }
    const student = await this.studentService.findByAccount(account);
    if (!student) {
      return {
        code: ACCOUNT_NOT_EXIST,
        message: '账号不存在',
      };
    }

    return {
      code: LOGIN_ERROR,
      message: '登录失败，账号或者密码不对',
    };
  }

  @Mutation(() => Result, { description: '学员注册' })
  async studentRegister(
    @Args('account') account: string,
    @Args('password') password: string,
  ): Promise<Result> {
    const result = accountAndPwdValidate(account, password);
    if (result.code !== SUCCESS) {
      return result;
    }
    const student = await this.studentService.findByAccount(account);
    if (student) {
      return {
        code: ACCOUNT_EXIST,
        message: '账号已经存在，请使用其他账号',
      };
    }
    const res = await this.studentService.create({ account, password });
    if (res) {
      return {
        code: SUCCESS,
        message: '注册成功',
      };
    }
    return {
      code: REGISTER_ERROR,
      message: '注册失败',
    };
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
