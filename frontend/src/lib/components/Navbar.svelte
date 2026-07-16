<script lang="ts">
	import { page } from '$app/state';
	import { scrollY } from 'svelte/reactivity/window';

	type Props = {
		entries: Map<string, string>;
	};

	const { entries }: Props = $props();
</script>

<nav
	class={[
		'bg-zinc-950 text-zinc-50 flex z-50 w-screen fixed bottom-0 transition-colors',
		'border-t-transparent [.active]:border-t [.active]:border-t-zinc-800',
		'sm:top-0 sm:bottom-auto sm:[.active]:border-t-0 sm:[.active]:border-b-zinc-800 sm:border-b sm:border-b-transparent',
		"after:shadow-2xl after:shadow-zinc-950 after:content-[''] after:block after:h-full after:absolute after:top-0 after:right-0 after:w-screen after:pointer-events-none"
	]}
	class:active={scrollY.current && scrollY.current > 0}
>
	<ul class="flex justify-center sm:justify-end mx-responsive">
		{#each entries as [path, name]}
			{@render navEntry(path, name)}
		{/each}
	</ul>
</nav>

{#snippet navEntry(path: string, name: string)}
	{@const isCurrentPath = page.url.pathname === path}
	<li class="group" class:current={isCurrentPath}>
		<a
			href={path}
			class="block py-6 px-4 sm:py-4 sm:px-3 hover:bg-zinc-900 group-[.current]:underline group-[.current]:decoration-text"
			>{name}</a
		>
	</li>
{/snippet}
