import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const CurrentUser = createParamDecorator(
	(data: unknown, context: ExecutionContext) => {
		const ctx = GqlExecutionContext.create(context);
		const user = ctx.getContext().req.user;
		return user;
	},
);
