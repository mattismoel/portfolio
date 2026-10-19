import { query } from "$app/server";
import { getLocalsPocketBase } from "#lib/pocketbase.ts";
import { mapPBExperience, type PBExperience } from "./experience.server";

export const listExperiences = query(async () => {
	const pb = getLocalsPocketBase();

	const records = await pb.collection("experiences").getFullList<PBExperience>({
		sort: "fromYear,-toYear",
	});

	// Make sure that "current" workplaces are in front.
	return records.sort((a, _) => (a.toYear === 0 ? -1 : 1)).map((record) => mapPBExperience(record));
});
