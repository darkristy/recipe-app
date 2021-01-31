import { PrismaClient } from "@prisma/client";

import data from "../seed-data";

export const instructionSeeder = async (prisma: PrismaClient): Promise<void> => {
	const instructions = data.instructions;

	for (const instruction of instructions) {
		await prisma.instruction.create({
			data: {
				...instruction,
			},
		});
	}
};
