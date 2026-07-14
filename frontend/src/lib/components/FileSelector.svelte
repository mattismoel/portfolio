<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = Omit<HTMLInputAttributes, 'type'>;
	let props: Props = $props();
</script>

<input
	type="file"
	{...props}
	class={['file:bg-primary file:px-4 file:py-2 file:text-background']}
/>
