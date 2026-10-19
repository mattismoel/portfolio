import { baseFields } from "#lib/base.ts";
import z from "zod";

export const experienceTypes = ["workplace", "education", "volunteer", "project"] as const;

export const experienceTypeSchema = z.union(experienceTypes.map((type) => z.literal(type)));

export const experienceSchema = z.object({
	...baseFields.shape,
	name: z.string().nonempty(),
	location: z.string().nonempty(),
	description: z.string().nonempty(),
	points: z.union([z.string().array().optional(), z.null()]),
	type: experienceTypeSchema,
	fromYear: z.number().positive(),
	toYear: z.number().positive(),
});

export type Experience = z.infer<typeof experienceSchema>;
export type ExperienceType = z.infer<typeof experienceTypeSchema>;
