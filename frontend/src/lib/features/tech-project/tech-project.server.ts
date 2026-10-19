import z from "zod";
import { pbImageSchema, pbProjectSchema } from "../project";
import { createFileUrl, pbIdSchema } from "#lib/pocketbase.ts";
import { pbTechnologySchema } from "#lib/technology.server.ts";
import { techProjectSchema, type TechProject } from "./tech-project";
import { hasItems } from "#lib/array.ts";

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
