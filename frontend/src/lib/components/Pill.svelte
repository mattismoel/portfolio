<script lang="ts">
	import type { Snippet } from 'svelte';
	import IconContainer from './IconContainer.svelte';
	import type { ClassValue } from 'clsx';

	type Props = {
		children: Snippet<[]>;
		shade?: 'dark' | 'lighter';
		icon?: string;
		class?: ClassValue;
	};

	let { children, shade = 'dark', icon, ...rest }: Props = $props();
</script>

<li
	class={[
		'h-fit text-xs px-4 py-2 border rounded-full flex items-center gap-2 font-semibold',
		shade === 'dark' && 'bg-zinc-900 border-zinc-800',
		shade === 'lighter' && 'bg-zinc-800 border-zinc-700',
		rest.class
	]}
>
	{#if icon}
		<IconContainer {icon}>
			{@render children()}
		</IconContainer>
	{:else}
		{@render children()}
	{/if}
</li>
