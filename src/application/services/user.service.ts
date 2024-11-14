import { Injectable } from "@nestjs/common";
import { User } from "src/core/entities/user.entity";
import { LoginDTO } from "../dto/login.dto";
import { RegisterDTO } from "../dto/register.dto";
import { LoginUseCase } from "../use-cases/users/login.use-case";
import { RegisterUseCase } from "../use-cases/users/register.use-case";

@Injectable()
export class UserService {
    constructor(
        private readonly registerUseCase: RegisterUseCase,
        private readonly loginUseCase: LoginUseCase,
    ) {}
    
    async register(user: RegisterDTO): Promise<User> {
        console.debug('[UserService][register]');
        return this.registerUseCase.execute(user.username, user.password);
    }

    async login(loginDto: LoginDTO): Promise<User> {
        console.debug('[UserService][login]');
        return this.loginUseCase.execute(loginDto);
    }
}