import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";

import { User } from "../../models/user.model";

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService) {}

	async generateJWT(user: User): Promise<string> {
		return await this.jwtService.signAsync({ user });
	}

	async hashPassword(password: string): Promise<string> {
		return await argon2.hash(password, {
			hashLength: 12,
			type: argon2.argon2id,
		});
	}

	async compareWithPassword(attempt: string, user: User): Promise<boolean> {
		return await argon2.verify(user.password, attempt);
	}
}
