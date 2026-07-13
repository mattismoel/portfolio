<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		description?: string;
		class?: string;
		children: Snippet<[]>;
	};

	let props: Props = $props();
</script>

<fieldset class={['grid gap-2 py-16 first-of-type:pt-8 last-of-type:pb-8', props.class]}>
	<header class="mb-4">
		<h2 class={['text-text-light font-bold', props.description && 'mb-2']}>{props.title}</h2>
		{#if props.description !== undefined}
			<p>{props.description}</p>
		{/if}
	</header>

	{@render props.children()}
</fieldset>
