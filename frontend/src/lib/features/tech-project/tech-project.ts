import z from "zod";
import { pbImageSchema, pbProjectSchema, projectSchema } from "../project";
import { pbTechnologySchema, technologySchema } from "$lib/technology";
import { createFileUrl, pbIdSchema } from "$lib/pocketbase";
import { hasItems } from "$lib/array";

const techProjectSchema = projectSchema.extend({
	href: z.url().optional(),
	sourceHref: z.union([z.url(), z.literal("")]),
	technologies: technologySchema.array().min(1),
	usePreview: z.boolean(),
});

const pbTechProjectSchema = pbProjectSchema.extend({
	href: z.url().optional(),
	sourceHref: z.union([z.url(), z.literal("")]),
	technologies: pbIdSchema.array(),
	usePreview: z.boolean(),
	expand: z.object({
		images: pbImageSchema.array().optional(),
		technologies: pbTechnologySchema.array(),
	}),
});

export type TechProject = z.infer<typeof techProjectSchema>;
export type PBTechProject = z.infer<typeof pbTechProjectSchema>;

export const mapPBTechProject = (project: PBTechProject): TechProject => {
	return techProjectSchema.parse({
		...project,
		technologies: project.expand.technologies,
		images: hasItems(project.expand.images)
			? project.expand.images.map((img) => ({
					...img,
					src: createFileUrl("images", img.id, img.src),
				}))
			: undefined,
	});
};
