<script lang="ts">
	import type { Snippet } from "svelte";
	import type { ClassValue } from "svelte/elements";

	type Props = {
		children: Snippet<[]>;
		class?: ClassValue;
	};

	let props: Props = $props();
</script>

<div class={["rounded-default border border-zinc-800 bg-zinc-900 p-6", props.class]}>
	{@render props.children()}
</div>
