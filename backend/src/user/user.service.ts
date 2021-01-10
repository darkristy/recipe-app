import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateUserDTO, UserResponse, User } from "../models/user.model";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
		private authService: AuthService,
	) {}

	async showAll(): Promise<UserResponse[]> {
		return await this.userRepository.find();
	}

	async loginUser(data: CreateUserDTO): Promise<UserResponse> {
		const { username, password } = data;

		const user = await this.userRepository.findOne({ where: { username } });

		if (
			!user ||
			!(await this.authService.compareWithPassword(password, user))
		) {
			throw new HttpException(
				"Invalid username/password",
				HttpStatus.BAD_REQUEST,
			);
		}

		const token = await this.authService.generateJWT(user);
		const newUser = user.toResponseObject();

		return { ...newUser, access_token: token };
	}

	async registerUser(data: CreateUserDTO): Promise<UserResponse> {
		const { username, password } = data;

		const hashPassword = await this.authService.hashPassword(password);

		let user = await this.userRepository.findOne({ where: { username } });
		if (user) {
			throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
		}

		user = await this.userRepository.create({
			...data,
			password: hashPassword,
		});

		await this.userRepository.save(user);
		return user.toResponseObject();
	}
}
