import { PrismaClient } from "@prisma/client";

import data from "../seed-data";

export const measurmentUnitSeeder = async (prisma: PrismaClient): Promise<void> => {
	const measurmentUnits = data.measurmentUnits;

	for (const measurmentUnit of measurmentUnits) {
		await prisma.measurmentUnit.create({
			data: {
				...measurmentUnit,
			},
		});
	}
};
