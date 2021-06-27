import { Body, Req, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import { SignUpDto } from 'src/user/dtos/signup-dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from 'src/user/dtos/login-dto';
 
@Controller('authentication')
export class AuthController {
  constructor(
    private readonly userService: UserService
  ) {}
 
  @Post('register')
  async register(@Body() signUpDto: SignUpDto) {
    return this.userService.register(signUpDto);
  }
 
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto);
  }
}