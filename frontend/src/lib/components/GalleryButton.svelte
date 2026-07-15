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
		'group aspect-square rounded-full px-3 py-2 bg-primary text-background cursor-pointer hover:scale-110 disabled:opacity-0 disabled:cursor-default transition-[opacity,scale]',
		rest.class
	]}
>
	<div
		class={[
			'transition-transform',
			direction === 'left' && 'group-hover:-translate-x-1',
			direction === 'right' && 'group-hover:translate-x-1'
		]}
	>
		{@render children?.()}
	</div>
</button>
