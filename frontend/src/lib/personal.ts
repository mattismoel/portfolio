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
}

export type Address = {
	city: string;
	country: string;
}

export const info: PersonalInformation = {
	firstName: "Mattis",
	lastName: "Møl Kristensen",
	address: { city: "Odense", country: "Denmark" },
	birthday: parse("31/12/2004", "dd/MM/yyyy", new Date()),
	pictureUrl: MeImage,
};

export const socials: Social[] = [
	{
		name: "GitHub",
		url: "https://github.com/mattismoel",
		iconName: "fa7-brands:github",
	},
	{
		name: "Mail",
		url: "mailto:mattismoel@gmail.com",
		iconName: "fa7-solid:envelope",
	},
];
