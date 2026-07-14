<script lang="ts">
	import type { RemoteFormIssue } from '@sveltejs/kit';
	import ErrorList from './ErrorList.svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		issues: RemoteFormIssue[] | undefined;
		class?: string;
		children: Snippet<[]>;
	};

	let props: Props = $props();
</script>

<div class={['grid gap-2', props.class]}>
	{@render props.children()}
	<ErrorList issues={props.issues} />
</div>
