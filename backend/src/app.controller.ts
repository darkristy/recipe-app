/* eslint-disable no-useless-constructor */
import { Controller, Get, Req, Res } from "@nestjs/common";

import { AppService } from "./app.service";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(@Req() req, @Res() res): string {
		return this.appService.getHello(req, res);
	}
}
