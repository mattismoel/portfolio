<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";

	type Props = HTMLButtonAttributes & {
		direction: "left" | "right";
	};

	let { children, direction, ...rest }: Props = $props();
</script>

<button
	{...rest}
	class={[
		"group flex w-full cursor-pointer items-center justify-center gap-4 rounded-full border border-zinc-800 bg-background px-5 py-2 text-text-light transition-colors sm:w-fit",
		"disabled:cursor-default disabled:border-transparent disabled:text-text/50",
		rest.class,
	]}
>
	{#if direction === "right"}
		Next
	{/if}
	<span
		class={[
			"size-4 transition-transform group-disabled:group-hover:translate-x-0",
			direction === "left" &&
				"icon-[boxicons--arrow-big-left-filled] group-hover:-translate-x-1 group-disabled:icon-[boxicons--arrow-big-left]",
			direction === "right" &&
				"icon-[boxicons--arrow-big-right-filled] group-hover:translate-x-1 group-disabled:icon-[boxicons--arrow-big-right]",
		]}
	>
	</span>

	{#if direction === "left"}
		Previous
	{/if}
</button>
