import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";

import { UserDTO, UserResponse, User } from "../models/user.model";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
		private authService: AuthService,
	) {}

	async showAll(): Promise<UserResponse[]> {
		return await this.userRepository.find({
			relations: ["recipes"],
		});
	}

	async loginUser(data: UserDTO): Promise<{ username: string; token: string }> {
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

		return { username, token };
	}

	async registerUser(data: UserDTO): Promise<UserResponse> {
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

	async findUser(username: string): Promise<UserResponse> {
		const user = await this.userRepository.findOne({
			where: { username },
			relations: ["recipes"],
		});
		return user.toResponseObject();
	}

	userById(id: number): Observable<UserResponse> {
		return from(
			this.userRepository.findOne({ id }, { relations: ["recipes"] }),
		).pipe(
			map((user: User) => {
				const { ...result } = user;
				return result;
			}),
		);
	}
}
