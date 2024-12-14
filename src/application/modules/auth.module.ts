import { Module } from "@nestjs/common";
import { JWtService } from "src/infrastructure/services/jwt.service";
import { JwtAuthGuard } from "../common/jwt.guard";

@Module({
    providers: [
        {
            provide: 'JWTService',
            useClass: JWtService,
        },
        JwtAuthGuard,
    ],
    exports: ['JWTService']
})
export class AuthModule {}