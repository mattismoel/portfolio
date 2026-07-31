<script lang="ts">
	type Tab = {
		name: string;
		value: string;
	};

	type Props = {
		title?: string;
		tabs: Tab[];
		selected: string;
		animate?: boolean;
		class?: string;
	};

	let { tabs, title, animate = true, selected = $bindable(), ...rest }: Props = $props();

	let selectedIdx = $derived(tabs.findIndex((t) => t.value === selected));

	let width = $state(0);
	let tabWidth = $derived(tabs.length ? width / tabs.length : 0);
	let hasInteracted = $state(false);
</script>

<div class="grid">
	{#if title}
		<p class="mb-4 text-center text-xs">{title}</p>
	{/if}

	<div bind:clientWidth={width} class={["relative isolate mb-8 flex h-fit w-full", rest.class]}>
		<div class="absolute -z-20 h-full w-full rounded-full bg-zinc-900"></div>

		{#if tabWidth > 0}
			<div
				style:transform="translateX(calc({selectedIdx}*100%))"
				style:width="{tabWidth}px"
				class={[
					"absolute -z-10 h-full rounded-full bg-heading transition-[transform] duration-100 ease-in-out",

					!hasInteracted && animate && "animate-lean",
				]}
			></div>

			{#each tabs as tab}
				<button
					class:active={selected === tab.value}
					class={[
						"w-full cursor-pointer py-3 transition-colors duration-300 not-[.active]:hover:text-heading not-[.active]:hover:underline sm:py-2 sm:text-sm [.active]:cursor-default [.active]:font-bold [.active]:text-zinc-950",
					]}
					onclick={() => {
						hasInteracted = true;
						selected = tab.value;
					}}>{tab.name}</button
				>
			{/each}
		{/if}
	</div>
</div>
