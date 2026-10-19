import z from "zod";
import { pbBaseFields } from "./pocketbase";
import { technologySchema, type Technology } from "./technology";

export const pbTechnologySchema = z.object({
	...pbBaseFields.shape,
	name: z.string().nonempty(),
	href: z.url().nonempty(),
});

export type PBTechnology = z.infer<typeof pbTechnologySchema>;

export const mapPBTechnology = (record: PBTechnology): Technology => {
	return technologySchema.parse(record);
};
