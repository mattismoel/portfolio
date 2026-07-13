<script lang="ts">
	import type { RemoteFormIssue } from '@sveltejs/kit';

	type Props = {
		issues?: RemoteFormIssue[];
	};

	let { issues }: Props = $props();
</script>

{#if issues !== undefined}
	<ul class="text-xs list-disc list-inside text-red-700">
		{#each issues as issue}
			<li>{issue.message}</li>
		{/each}
	</ul>
{/if}
