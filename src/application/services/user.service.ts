import { Injectable } from "@nestjs/common";
import { LoginResponseDTO } from "../dto/login-response.dto";
import { UserResponseDTO } from "../dto/user-response.dto";
import { LoginUseCase } from "../use-cases/users/login.use-case";
import { RegisterUseCase } from "../use-cases/users/register.use-case";
import { UserInfoDTO } from "../dto/user-info.dto";
import { GetUserInfoUseCase } from "../use-cases/users/get-user-info.use-case";
import { UserUniquenessValidator } from "src/core/services/user-uniquess.service";

@Injectable()
export class UserService {
    constructor(
        private readonly registerUseCase: RegisterUseCase,
        private readonly loginUseCase: LoginUseCase,
        private readonly getUserInfoUseCase: GetUserInfoUseCase,
    ) { }
    
    async register(user: string, password: string): Promise<UserResponseDTO> {
        return this.registerUseCase.execute(user, password);
    }

    async login(user: string, password: string): Promise<LoginResponseDTO> {
        return this.loginUseCase.execute(user, password);
    }

    async getUserInfo(userId: string): Promise<UserInfoDTO> {
        return this.getUserInfoUseCase.execute(userId)
    }
}