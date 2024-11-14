import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { LoginDTO } from "src/application/dto/login.dto";
import { RegisterDTO } from "src/application/dto/register.dto";
import { UserService } from "src/application/services/user.service";
import { User } from "src/core/entities/user.entity";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    @HttpCode(201)
    async register(@Body() user: RegisterDTO): Promise<User> {
        return this.userService.register(user);
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body() loginDto: LoginDTO): Promise<User> {
        return this.userService.login(loginDto);
    }
}