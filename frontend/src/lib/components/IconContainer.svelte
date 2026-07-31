<script lang="ts">
	import type { Snippet } from "svelte";
	import type { ClassValue } from "svelte/elements";

	type Spacing = "tight" | "relaxed" | "loose";

	type Props = {
		icon: string;
		side?: "left" | "right";
		spacing?: Spacing;

		iconClass?: ClassValue;
		class?: ClassValue;

		children: Snippet<[]>;
	};

	let { icon, side = "left", spacing = "relaxed", ...rest }: Props = $props();

	const spacingClasses: Record<Spacing, string> = {
		tight: "gap-1",
		relaxed: "gap-2",
		loose: "gap-4",
	};
</script>

<div
	class={[
		"flex items-center",
		spacingClasses[spacing],
		rest.class,
		side === "right" && "flex-row-reverse",
	]}
>
	<span class={[icon, rest.iconClass]}></span>

	{@render rest.children()}
</div>
