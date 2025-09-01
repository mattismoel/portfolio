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
	class="z-50 dialog hidden fixed flex-col gap-8 items-center justify-center w-screen h-screen top-0 left-0 cursor-pointer bg-black/75 [.open]:flex"
>
	<span class="text-heading">{imgProps?.alt}</span>

	{#if imgProps}
		<img
			src={imgProps.src}
			alt={imgProps?.alt}
			use:clickOutside
			onclickoutside={onclose}
			class="max-w-[85vw] max-h-[75svh] cursor-default"
		/>
	{/if}
</div>
