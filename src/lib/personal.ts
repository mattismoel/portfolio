import MeImage from "$lib/assets/me.jpg";
import { parse } from "date-fns";

export type PersonalInformation = {
	firstName: string;
	lastName: string;
	address: Address;
	birthday: Date;
	pictureUrl: string;
}

export type Social = {
	name: string;
	url: string
	iconName: string;
}

export type Address = {
	city: string;
	countryCode: string;
}

export const info: PersonalInformation = {
	firstName: "Mattis",
	lastName: "Møl Kristensen",
	address: { city: "Odense", countryCode: "DK" },
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
