import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common";
import { LoginDTO } from "src/application/dto/login.dto";
import { RegisterDTO } from "src/application/dto/register.dto";
import { UserService } from "src/application/services/user.service";
import { LoginResponseDTO } from "../dto/login-response.dto";
import { UserInfoDTO } from "../dto/user-info.dto";
import { UserResponseDTO } from "../dto/user-response.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    @HttpCode(201)
    async register(@Body() user: RegisterDTO): Promise<UserResponseDTO> {
        return this.userService.register(user.userName, user.password);
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body() loginData: LoginDTO): Promise<LoginResponseDTO> {
        return this.userService.login(loginData.userName, loginData.password);
    }

    @Get(':id')
    async getUserInfo(@Param('id') userId: string): Promise<UserInfoDTO>{
        return this.userService.getUserInfo(userId);
    }

}