<script lang="ts">
	import type { HTMLSelectAttributes } from 'svelte/elements';

	type Option = {
		icon?: string;
		value: string;
		name: string;
	};

	type Props = HTMLSelectAttributes & {
		options: Option[];
		selected: string[];
	};

	let { options, selected = $bindable([]), ...rest }: Props = $props();

	const toggle = (value: string) => {
		const index = selected.indexOf(value);

		if (index === -1) {
			selected = [...selected, value];
		} else {
			selected = selected.filter((v) => v !== value);
		}
	};

	let mouseDown = $state(false);

	const handleMouseEnterPill = (value: string) => {
		if (!mouseDown) return;
		toggle(value);
	};
</script>

<svelte:window onmousedown={() => (mouseDown = true)} onmouseup={() => (mouseDown = false)} />

<select multiple hidden {...rest}>
	{#each options as { value, name }}
		<option selected={selected.includes(value)} {value}>{name}</option>
	{/each}
</select>

<ul class="flex flex-wrap gap-1">
	{#each options as { value, name, icon }}
		{@const isSelected = selected.includes(value)}
		<li>
			<button
				type="button"
				onmouseenter={() => handleMouseEnterPill(value)}
				onmousedown={() => toggle(value)}
				class={[
					'flex gap-2 items-center border border-primary/10 px-2 py-1',
					isSelected ? 'bg-primary/10 font-medium' : 'bg-background'
				]}
			>
				{#if icon}
					<span class={icon}></span>
				{/if}
				{name}
			</button>
		</li>
	{/each}
</ul>
