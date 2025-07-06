import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { LoginDTO } from 'src/infrastructure/presenters/http/dto/requests/login.dto';
import { RegisterDTO } from 'src/infrastructure/presenters/http/dto/requests/register.dto';
import { UserService } from 'src/application/services/user.service';
import { LoginResponseDTO } from '../dto/responses/login-response.dto';
import { UserInfoDTO } from '../dto/responses/user-info.dto';
import { UserResponseDTO } from '../dto/responses/user-response.dto';
import { UserNotFoundException } from 'src/domain/exceptions/user_not_found.exception';
import { UserMapper } from '../mappers/user.mapper';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(201)
  async register(@Body() registerData: RegisterDTO): Promise<UserResponseDTO> {
    const user = await this.userService.register(
      registerData.userName,
      registerData.password,
    );
    return UserMapper.toDTO(user);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginData: LoginDTO): Promise<LoginResponseDTO> {
    try {
      const login = await this.userService.login(
        loginData.userName,
        loginData.password,
      );

      return {
        userId: login.userId,
        accessToken: login.token,
        loggedAt: login.loggedAt,
      };
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      throw error;
    }
  }

  @Get(':id')
  async getUserInfo(@Param('id') userId: string): Promise<UserInfoDTO> {
    try {
      const user = await this.userService.getUserInfo(userId);

      return { userName: user.userName };
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      throw error;
    }
  }
}
