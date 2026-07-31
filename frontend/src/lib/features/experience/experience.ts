import { baseFields } from "$lib/base";
import { pbBaseFields } from "$lib/pocketbase";
import z from "zod";

export const experienceTypes = ["workplace", "education", "volunteer", "project"] as const;

const experienceType = z.union(experienceTypes.map((type) => z.literal(type)));

export const experienceSchema = z.object({
	...baseFields.shape,
	name: z.string().nonempty(),
	location: z.string().nonempty(),
	description: z.string().nonempty(),
	points: z.union([z.string().array().optional(), z.null()]),
	type: experienceType,
	fromYear: z.number().positive(),
	toYear: z.number().positive(),
});

const pbExperienceSchema = z.object({
	...pbBaseFields.shape,
	name: z.string().nonempty(),
	location: z.string().nonempty(),
	description: z.string().nonempty(),
	points: z.union([z.string().array().optional(), z.null()]),
	type: experienceType,
	fromYear: z.number().positive(),
	toYear: z.number().positive(),
});

export type Experience = z.infer<typeof experienceSchema>;
export type PBExperience = z.infer<typeof pbExperienceSchema>;
export type ExperienceType = z.infer<typeof experienceType>;

export const mapPBExperience = (record: PBExperience): Experience => {
	return experienceSchema.parse(record);
};
