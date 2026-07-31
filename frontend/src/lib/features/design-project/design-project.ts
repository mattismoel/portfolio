import z from "zod";
import { pbImageSchema, pbProjectSchema, projectSchema } from "../project";
import { createFileUrl } from "$lib/pocketbase";

const designProjectType = z.union([z.literal("product"), z.literal("graphics")]);

export const designProjectSchema = projectSchema.extend({
	types: designProjectType.array().min(1),
});

export const pbDesignProjectSchema = pbProjectSchema.extend({
	types: designProjectType.array().min(1),
	expand: z.object({
		images: pbImageSchema.array(),
	}),
});

export type DesignProject = z.infer<typeof designProjectSchema>;
export type PBDesignProject = z.infer<typeof pbDesignProjectSchema>;
export type DesignProjectType = z.infer<typeof designProjectType>;

export const mapPBDesignProject = (record: PBDesignProject): DesignProject => {
	return designProjectSchema.parse({
		...record,
		images: record.expand.images.map((img) => ({
			...img,
			src: createFileUrl("images", img.id, img.src),
		})),
	});
};
