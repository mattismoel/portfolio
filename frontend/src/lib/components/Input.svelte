<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = HTMLInputAttributes;
	let props: Props = $props();
</script>

<input
	{...props}
	class={['px-4 py-2 bg-background border border-text/10 rounded-sm', props.class]}
/>
