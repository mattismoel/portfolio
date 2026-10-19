import { pbBaseFields } from "#lib/pocketbase.ts";
import z from "zod";
import { experienceSchema, experienceTypeSchema, type Experience } from "./experience";

const pbExperienceSchema = z.object({
	...pbBaseFields.shape,
	name: z.string().nonempty(),
	location: z.string().nonempty(),
	description: z.string().nonempty(),
	points: z.union([z.string().array().optional(), z.null()]),
	type: experienceTypeSchema,
	fromYear: z.number().positive(),
	toYear: z.number().positive(),
});

export type PBExperience = z.infer<typeof pbExperienceSchema>;

export const mapPBExperience = (record: PBExperience): Experience => {
	return experienceSchema.parse(record);
};
