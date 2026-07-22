<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		children: Snippet<[]>;
		class?: ClassValue;
	};

	let props: Props = $props();
</script>

<div class={['p-6 rounded-default bg-zinc-900 border border-zinc-800', props.class]}>
	{@render props.children()}
</div>
