import MeImage from "./assets/me.jpg";
import type { HTMLImgAttributes } from "svelte/elements"
import { parse } from "date-fns";

export type PersonalInformation = {
  firstName: string;
  lastName: string;
  address: Address;
  birthday: Date;
  pictureUrl: HTMLImgAttributes["src"];
}

export type Social = {
  name: string;
  url: string
  iconName: string;
  text?: string;
}

export type Address = {
  city: string;
  country: string;
}

export const info: PersonalInformation = {
  firstName: "Mattis",
  lastName: "Møl Kristensen",
  address: { city: "Copenhagen", country: "Denmark" },
  birthday: parse("31/12/2004", "dd/MM/yyyy", new Date()),
  pictureUrl: MeImage,
};

export const socials: Social[] = [
  {
    name: "GitHub",
    url: "https://github.com/mattismoel",
    text: "@mattismoel",
    iconName: "icon-[simple-icons--github]",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/mattismoel",
    text: "@mattismoel",
    iconName: "icon-[simple-icons--instagram]",
  },
  {
    name: "Phone",
    url: "tel:+4542157066",
    text: "+4542157066",
    iconName: "icon-[boxicons--phone-filled]",
  },
  {
    name: "Mail",
    url: "mailto:mattismoel@gmail.com",
    text: "mattismoel@gmail.com",
    iconName: "icon-[boxicons--envelope-filled]",
  },
];
