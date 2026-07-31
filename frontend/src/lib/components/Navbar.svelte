<script lang="ts">
	import { page } from "$app/state";
	import { scrollY } from "svelte/reactivity/window";

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
		"fixed bottom-0 z-50 flex w-screen bg-zinc-900 text-zinc-50 transition-[background,border,translate] sm:bg-background",
		"translate-y-[90%] border-t-background sm:translate-y-0 [.active]:translate-y-0 [.active]:border-t [.active]:border-t-zinc-800",
		"sm:top-0 sm:bottom-auto sm:border-b sm:border-b-background sm:[.active]:border-t-0 sm:[.active]:border-b-zinc-700",
		"after:pointer-events-none after:absolute after:top-0 after:right-0 after:block after:h-full after:w-screen after:shadow-2xl after:shadow-zinc-950 after:content-['']",
		"[.active]:border-b-zinc-700 sm:[.active]:bg-zinc-900",
	]}
	class:active={scrolled}
>
	<ul
		style="grid-template-columns: repeat({entries.size}, 1fr)"
		class="mx-responsive grid grid-cols-1 justify-center sm:flex sm:justify-end"
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
			class="flex justify-center px-4 py-8 underline decoration-transparent underline-offset-4 transition-colors duration-100 group-[.current]:decoration-text-light/50 hover:bg-zinc-900 sm:px-5 sm:py-4"
			>{name}</a
		>
	</li>
{/snippet}
