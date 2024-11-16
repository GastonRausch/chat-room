import { Injectable } from "@nestjs/common";
import { LoginResponseDTO } from "../dto/login-response.dto";
import { UserResponseDTO } from "../dto/user-response.dto";
import { LoginUseCase } from "../use-cases/users/login.use-case";
import { RegisterUseCase } from "../use-cases/users/register.use-case";

@Injectable()
export class UserService {
    constructor(
        private readonly registerUseCase: RegisterUseCase,
        private readonly loginUseCase: LoginUseCase,
    ) {}
    
    async register(user: string, password: string): Promise<UserResponseDTO> {
        console.debug('[UserService][register]');
        return this.registerUseCase.execute(user, password);
    }

    async login(user: string, password: string): Promise<LoginResponseDTO> {
        console.debug('[UserService][login]');
        return this.loginUseCase.execute(user, password);
    }
}