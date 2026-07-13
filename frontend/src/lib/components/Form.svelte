<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLFormAttributes } from 'svelte/elements';
	import Button from './Button.svelte';

	type Props = HTMLFormAttributes & {
		title: string;
		description?: string;
		children: Snippet<[]>;
		uploadBtnText?: string;
	};

	let { title, description, uploadBtnText = 'Submit', children, ...rest }: Props = $props();
</script>

<form {...rest}>
	<header class="mb-6">
		<h1 class="font-bold text-text-light text-2xl mb-4">{title}</h1>
		{#if description !== undefined}
			<p>{description}</p>
		{/if}
	</header>

	<div class="mb-8 divide-y divide-text/10">
		{@render children()}
	</div>

	<Button>{uploadBtnText}</Button>
</form>
