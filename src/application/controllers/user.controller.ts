import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { LoginDTO } from "src/application/dto/login.dto";
import { RegisterDTO } from "src/application/dto/register.dto";
import { UserService } from "src/application/services/user.service";
import { LoginResponseDTO } from "../dto/login-response.dto";
import { UserResponseDTO } from "../dto/user-response.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    @HttpCode(201)
    async register(@Body() user: RegisterDTO): Promise<UserResponseDTO> {
        return this.userService.register(user.username, user.password);
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body() loginData: LoginDTO): Promise<LoginResponseDTO> {
        return this.userService.login(loginData.username, loginData.password);
    }
}