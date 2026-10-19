import z from "zod";
import { projectSchema } from "../project";
import { technologySchema } from "#lib/technology.ts";

export const techProjectSchema = projectSchema.extend({
	href: z.url().optional(),
	sourceHref: z.union([z.url(), z.literal("")]),
	technologies: technologySchema.array().min(1),
	archived: z.boolean(),
	usePreview: z.boolean(),
});

export type TechProject = z.infer<typeof techProjectSchema>;
