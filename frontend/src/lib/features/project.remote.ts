import { form } from "$app/server";
import z from "zod";
import { getLocalsPocketBase } from "$lib/pocketbase";
import { mapPBImage, type PBImage } from "./project";
import { idSchema } from "$lib/base";


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

const editImageDescriptionFormSchema = z.object({
  imageId: idSchema,
  description: z.string().nonempty(),
})

export const editImageDescription = form(editImageDescriptionFormSchema, async ({ imageId, description }) => {
  const pb = getLocalsPocketBase()

  await pb.collection("images").update(imageId, { description })
})
