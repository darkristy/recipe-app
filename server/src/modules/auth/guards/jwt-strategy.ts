import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { Request } from "express";
import "dotenv/config";

const cookieExtractor = (req: Request): string | null => {
	let token = null;
	if (req && req.cookies) {
		token = req.cookies.token;
	}
	return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.SECRET,
		});
	}

	async validate(payload: any): Promise<any> {
		return { ...payload.user };
	}
}
