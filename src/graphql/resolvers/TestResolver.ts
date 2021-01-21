import { Query, Resolver } from "type-graphql";

@Resolver()
export class TestResolver {
	@Query(() => String)
	sayHello() {
		return "Hello World!";
	}
}
