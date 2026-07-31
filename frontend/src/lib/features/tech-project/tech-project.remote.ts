import { form, query } from "$app/server";
import { createExpandString, getLocalsPocketBase } from "$lib/pocketbase";
import z from "zod";
import { mapPBTechProject, type PBTechProject } from "./tech-project";
import { idSchema } from "$lib/base";

const TECH_PROJECT_EXPAND_PROPERTIES = ["images", "technologies"];

export const listTechProjects = query(async () => {
	const pb = getLocalsPocketBase();

	const records = await pb.collection("tech_projects").getFullList<PBTechProject>({
		expand: createExpandString(TECH_PROJECT_EXPAND_PROPERTIES),
		sort: "-finishYear,title",
	});

	return records.map((record) => mapPBTechProject(record));
});

export const getTechProject = query(idSchema, async (id) => {
	const pb = getLocalsPocketBase();

	const record = await pb.collection("tech_projects").getOne<PBTechProject>(id, {
		expand: createExpandString(TECH_PROJECT_EXPAND_PROPERTIES),
	});

	return mapPBTechProject(record);
});

const baseTechProjectFormSchema = z.object({
	title: z.string().nonempty(),
	description: z.string().nonempty(),
	finishYear: z.number().positive(),
	images: idSchema.array().min(1),
	href: z.url().optional(),
	sourceHref: z.url().optional(),
	technologies: idSchema.array().min(1),
});

const createTechProjectFormSchema = baseTechProjectFormSchema;

const updateTechProjectFormSchema = z.object({
	projectId: idSchema,
	...baseTechProjectFormSchema.shape,
});

export const createTechProject = form(createTechProjectFormSchema, async (data) => {
	const pb = getLocalsPocketBase();

	await pb.collection("tech_projects").create(data);
});

export const updateTechProject = form(
	updateTechProjectFormSchema,
	async ({ projectId, ...data }) => {
		const pb = getLocalsPocketBase();

		pb.collection("tech_projects").update(projectId, data);
	},
);
