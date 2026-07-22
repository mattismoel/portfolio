<script lang="ts">
	type Tab = {
		name: string;
		value: string;
	};

	type Props = {
		tabs: Tab[];
		selected: string;
		class?: string;
	};

	let { tabs, selected = $bindable(), ...rest }: Props = $props();

	let selectedIdx = $derived(tabs.findIndex((t) => t.value === selected));

	let width = $state(0);
	let tabWidth = $derived(tabs.length ? width / tabs.length : 0);
	let hasInteracted = $state(false);
</script>

<div bind:clientWidth={width} class={['isolate h-fit relative w-full flex mb-8', rest.class]}>
	<div class="-z-20 absolute bg-zinc-900 w-full h-full rounded-full"></div>

	{#if tabWidth > 0}
		<div
			style:transform="translateX(calc({selectedIdx}*100%))"
			style:width="{tabWidth}px"
			class={[
				'-z-10 absolute h-full bg-heading rounded-full transition-[transform] ease-in-out duration-100',

				!hasInteracted && 'animate-lean'
			]}
		></div>

		{#each tabs as tab}
			<button
				class:active={selected === tab.value}
				class={[
					'w-full py-3 sm:py-2 sm:text-sm cursor-pointer [.active]:cursor-default not-[.active]:hover:text-heading not-[.active]:hover:underline [.active]:font-bold [.active]:text-zinc-950 transition-colors duration-300'
				]}
				onclick={() => {
					hasInteracted = true;
					selected = tab.value;
				}}>{tab.name}</button
			>
		{/each}
	{/if}
</div>
