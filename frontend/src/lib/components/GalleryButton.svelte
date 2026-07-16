<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = HTMLButtonAttributes & {
		direction: 'left' | 'right';
	};

	let { children, direction, ...rest }: Props = $props();
</script>

<button
	{...rest}
	class={[
		'group rounded-full flex items-center gap-4 py-2 px-5 justify-center bg-background border border-zinc-800 text-text-light cursor-pointer transition-colors w-full sm:w-fit',
		'disabled:text-text/50 disabled:cursor-default disabled:border-transparent',
		rest.class
	]}
>
	{#if direction === 'right'}
		Next
	{/if}
	<span
		class={[
			'transition-transform size-4 group-disabled:group-hover:translate-x-0',
			direction === 'left' &&
				'group-disabled:icon-[boxicons--arrow-big-left] icon-[boxicons--arrow-big-left-filled] group-hover:-translate-x-1',
			direction === 'right' &&
				'group-disabled:icon-[boxicons--arrow-big-right] icon-[boxicons--arrow-big-right-filled] group-hover:translate-x-1'
		]}
	>
	</span>

	{#if direction === 'left'}
		Previous
	{/if}
</button>
