import { PrismaClient } from "@prisma/client";

import data from "../seed-data";

export const measurmentQtySeeder = async (prisma: PrismaClient): Promise<void> => {
	const measurmentQtys = data.measurmentQtys;

	for (const measurmentQty of measurmentQtys) {
		await prisma.measurmentQty.create({
			data: {
				...measurmentQty,
			},
		});
	}
};
