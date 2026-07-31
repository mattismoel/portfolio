import { query } from "$app/server";
import { createExpandString, getLocalsPocketBase } from "$lib/pocketbase";
import { mapPBDesignProject, type PBDesignProject } from "./design-project";

const EXPAND_PROPERTIES = ["images"];

export const listDesignProjects = query(async () => {
	const pb = getLocalsPocketBase();

	const records = await pb.collection("design_projects").getFullList<PBDesignProject>({
		expand: createExpandString(EXPAND_PROPERTIES),
		sort: "-finishYear,title",
	});

	return records.map((record) => mapPBDesignProject(record));
});
