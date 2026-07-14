import { query } from "$app/server"
import { getLocalsPocketBase } from "$lib/pocketbase"
import { mapPBExperience, type PBExperience } from "./experience"

export const listExperiences = query(async () => {
  const pb = getLocalsPocketBase()

  const records = await pb.collection("experiences").getFullList<PBExperience>({
    sort: "fromYear"
  })

  return records.map(record => mapPBExperience(record))
})
