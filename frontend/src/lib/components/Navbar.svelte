<script lang="ts">
	import { page } from '$app/state';
	import { scrollY } from 'svelte/reactivity/window';

	type Props = {
		entries: Map<string, string>;
	};

	const { entries }: Props = $props();

	let prevScroll = 0;
	let scrolled = $state(false);

	$effect(() => {
		if (scrollY.current === undefined) return;

		const diff = prevScroll - scrollY.current;
		scrolled = diff >= 0;
		prevScroll = scrollY.current;
	});
</script>

<nav
	class={[
		'bg-zinc-900 sm:bg-background text-zinc-50 flex z-50 w-screen fixed bottom-0 transition-[background,border,translate]',
		'translate-y-[90%] sm:translate-y-0 border-t-background [.active]:border-t [.active]:border-t-zinc-800 [.active]:translate-y-0',
		'sm:top-0 sm:bottom-auto sm:[.active]:border-t-0 sm:[.active]:border-b-zinc-700 sm:border-b sm:border-b-background',
		"after:shadow-2xl after:shadow-zinc-950 after:content-[''] after:block after:h-full after:absolute after:top-0 after:right-0 after:w-screen after:pointer-events-none",
		'sm:[.active]:bg-zinc-900 [.active]:border-b-zinc-700'
	]}
	class:active={scrolled}
>
	<ul
		style="grid-template-columns: repeat({entries.size}, 1fr)"
		class="grid grid-cols-1 sm:flex justify-center sm:justify-end mx-responsive"
	>
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
			class="flex justify-center py-8 px-4 sm:py-4 sm:px-5 hover:bg-zinc-900 underline decoration-transparent underline-offset-4 group-[.current]:decoration-text-light/50 transition-colors duration-100"
			>{name}</a
		>
	</li>
{/snippet}
