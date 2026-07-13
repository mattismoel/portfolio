import { query } from "$app/server";
import { getLocalsPocketBase } from "./pocketbase";
import { mapPBTechnology, type PBTechnology } from "./technology";

export const listTechnologies = query(async () => {
  const pb = getLocalsPocketBase()

  const records = await pb.collection("technologies").getFullList<PBTechnology>()

  return records.map(record => mapPBTechnology(record))
})
