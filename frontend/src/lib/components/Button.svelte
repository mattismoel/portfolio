<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";

	type Props = HTMLButtonAttributes;
	let props: Props = $props();
</script>

<button {...props} class="rounded-sm bg-primary px-4 py-2 font-medium text-background">
	{@render props.children?.()}
</button>
