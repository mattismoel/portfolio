<script lang="ts">
	type Props = {
		tabs: string[];
		selected: string;
		onSelect: (tab: string) => void;
	};

	let { tabs, selected, onSelect }: Props = $props();

	let selectedIdx = $derived(tabs.indexOf(selected));
</script>

<div class="isolate relative w-full flex mb-8">
	<div class="-z-20 absolute bg-zinc-900 w-full h-full rounded-full"></div>
	<div
		style:transform="translateX(calc({selectedIdx}*100%))"
		class="-z-10 absolute w-1/2 h-full bg-heading rounded-full transition-[transform] ease-in-out duration-100"
	></div>

	{#each tabs as tab}
		<button
			class:active={selected === tab}
			class="w-full py-1 cursor-pointer [.active]:cursor-default not-[.active]:hover:text-heading not-[.active]:hover:underline [.active]:font-bold [.active]:text-zinc-950 transition-colors duration-300"
			onclick={() => onSelect(tab)}>{tab}</button
		>
	{/each}
</div>
