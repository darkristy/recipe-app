/* eslint-disable no-shadow */
import {
	Injectable,
	CanActivate,
	ExecutionContext,
	Inject,
	forwardRef,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { GqlExecutionContext } from "@nestjs/graphql";

import { UserService } from "../../user/user.service";
import { User } from "../../models/user.model";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private reflector: Reflector,

		@Inject(forwardRef(() => UserService))
		private userService: UserService,
	) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const ctx = GqlExecutionContext.create(context);

		const roles = this.reflector.get<string[]>("roles", ctx.getHandler());
		if (!roles) {
			return true;
		}
		const user: User = ctx.getContext().req.user;

		return this.userService.userById(user.id).pipe(
			map((user: User) => {
				const hasRole = (): boolean => roles.indexOf(user.role) > -1;
				let hasPermission: boolean = false;

				if (hasRole()) {
					hasPermission = true;
				}
				return user && hasPermission;
			}),
		);
	}
}
