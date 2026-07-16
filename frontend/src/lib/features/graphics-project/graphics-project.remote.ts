import { query } from "$app/server";
import { createExpandString, getLocalsPocketBase } from "$lib/pocketbase";
import { mapPBGraphicsProject, type PBGraphicsProject } from "./graphics-project";

const EXPAND_PROPERTIES = ["images"]

export const listGraphicsProjects = query(async () => {
  const pb = getLocalsPocketBase()

  const records = await pb.collection("graphics_projects").getFullList<PBGraphicsProject>({
    expand: createExpandString(EXPAND_PROPERTIES),
    sort: "-finishYear"
  })

  return records.map(record => mapPBGraphicsProject(record))
})
