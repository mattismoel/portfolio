import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
	POCKETBASE_URL: { static: true },
	PUBLIC_POCKETBASE_URL: { public: true, static: true },
});
