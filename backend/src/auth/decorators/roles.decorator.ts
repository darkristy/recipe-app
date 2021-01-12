/* eslint-disable no-shadow */
import { CustomDecorator, SetMetadata } from "@nestjs/common";

export const Roles = (...Roles: string[]): CustomDecorator<string> =>
	SetMetadata("roles", Roles);
