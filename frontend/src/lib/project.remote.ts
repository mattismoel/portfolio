import { query } from "$app/server";
import { createExpandString, getLocalsPocketBase } from "./pocketbase";
import { mapPBTechProject, type PBTechProject } from "./project";

const TECH_PROJECT_EXPAND_PROPERTIES = ["images", "technologies"]

export const listTechProjects = query(async () => {
  const pb = getLocalsPocketBase()

  const records = await pb.collection("tech_projects").getFullList<PBTechProject>({
    expand: createExpandString(TECH_PROJECT_EXPAND_PROPERTIES)
  })

  console.log(records)

  return records.map(record => mapPBTechProject(record))
})
