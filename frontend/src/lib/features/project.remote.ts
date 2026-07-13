import { form } from "$app/server";
import z from "zod";
import { getLocalsPocketBase } from "$lib/pocketbase";
import { mapPBImage, type PBImage } from "./project";


const uploadImageFormSchema = z.object({
  file: z.file(),
  description: z.string().nonempty()
})

export const uploadImage = form(uploadImageFormSchema, async (data) => {
  const pb = getLocalsPocketBase()
  const record = await pb.collection("images").create<PBImage>({
    ...data,
    src: data.file
  })

  return { image: mapPBImage(record) }
})
