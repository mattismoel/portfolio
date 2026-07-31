<script lang="ts">
	import type { Snippet } from "svelte";
	import IconContainer from "./IconContainer.svelte";
	import type { ClassValue } from "clsx";

	type Props = {
		children: Snippet<[]>;
		shade?: "dark" | "lighter";
		icon?: string;
		class?: ClassValue;
	};

	let { children, shade = "dark", icon, ...rest }: Props = $props();
</script>

<li
	class={[
		"flex h-fit items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold",
		shade === "dark" && "border-zinc-800 bg-zinc-900",
		shade === "lighter" && "border-zinc-700 bg-zinc-800",
		rest.class,
	]}
>
	{#if icon}
		<IconContainer {icon}>
			{@render children()}
		</IconContainer>
	{:else}
		{@render children()}
	{/if}
</li>
