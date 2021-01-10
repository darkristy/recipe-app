import { Injectable } from "@nestjs/common";

import { message } from "./constants/project";

@Injectable()
export class AppService {
	getHello(req, res): any {
		res.json({
			message,
		});
	}
}
