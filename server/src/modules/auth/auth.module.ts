import { ConfigModule, ConfigService } from "@nestjs/config";
import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { UserModule } from "../user/user.module";

import { JwtStrategy } from "./guards/jwt-strategy";
import { JwtAuthGuard } from "./guards/jwt-guard";
import { AuthService } from "./auth.service";

@Module({
	imports: [
		forwardRef(() => UserModule),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async () => ({
				secret: process.env.SECRET,
				signOptions: { expiresIn: "2d" },
			}),
		}),
	],
	providers: [AuthService, JwtAuthGuard, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
