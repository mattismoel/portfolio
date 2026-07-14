<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = HTMLButtonAttributes;
	let props: Props = $props();
</script>

<button {...props} class="bg-primary text-background py-2 px-4 rounded-sm font-medium">
	{@render props.children?.()}
</button>
