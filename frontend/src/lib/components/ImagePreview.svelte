<script lang="ts">
	import { clickOutside } from "$lib/actions/click-outside.svelte";
	import type { HTMLImgAttributes } from "svelte/elements";

	type Props = {
		onclose: () => void;
		imgProps: HTMLImgAttributes | undefined;
		show: boolean;
	};

	let { imgProps, show, onclose, ...rest }: Props = $props();

	let dialogElement = $state<HTMLDivElement>();
</script>

<svelte:window onkeydown={({ key }) => key === "Escape" && onclose()} />

<div
	{...rest}
	{onclose}
	bind:this={dialogElement}
	class:open={show}
	class="dialog fixed top-0 left-0 z-50 hidden h-screen w-screen cursor-pointer flex-col items-center justify-center gap-8 bg-black/75 [.open]:flex"
>
	<span class="text-heading">{imgProps?.alt}</span>

	{#if imgProps}
		<img
			src={imgProps.src}
			alt={imgProps?.alt}
			use:clickOutside
			onclickoutside={onclose}
			class="max-h-[75svh] max-w-[85vw] cursor-default"
		/>
	{/if}
</div>
