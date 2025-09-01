<script lang="ts">
	import BorderedImage from "./BorderedImage.svelte";
	import Icon from "@iconify/svelte";
	import GalleryButton from "./GalleryButton.svelte";
	import ImagePreview from "./ImagePreview.svelte";
	import type { HTMLImgAttributes } from "svelte/elements";

	type Props = {
		imgsSrcs: {
			src: HTMLImgAttributes["src"];
			alt: string;
		}[];
	};

	const { imgsSrcs }: Props = $props();

	let previewImgProps = $state<HTMLImgAttributes>();
	let showPreview = $state(false);

	let el = $state<HTMLDivElement>();

	let scrollLeft = $state(0);

	let scrollSize = $derived.by(() => {
		if (!el) return 0;
		return el.scrollWidth / imgsSrcs.length;
	});

	let scrollIdx = $derived.by(() => {
		if (!el) return 0;
		const ratio = scrollLeft / el.scrollWidth;
		return Math.round(ratio * imgsSrcs.length);
	});

	const previewImage = (idx: number) => {
		previewImgProps = imgsSrcs[idx];
		console.log(previewImgProps);
		showPreview = true;
	};

	const scrollInDirection = (direction: number) => {
		if (!el) return;
		const nextIdx = scrollIdx + direction;
		if (nextIdx >= imgsSrcs.length) {
			el.scrollTo({ left: 0, behavior: "smooth" });
			return;
		}

		let newScrollPos = el.scrollLeft + direction * scrollSize;
		el.scrollTo({ left: newScrollPos, behavior: "smooth" });
	};
</script>

<div class="relative flex flex-col gap-8">
	<GalleryButton
		disabled={scrollIdx === 0}
		class="hidden cursor-pointer absolute top-1/2 left-0 -translate-x-16 -translate-y-1/2 transition-opacity md:block"
		onclick={() => scrollInDirection(-1)}
	>
		<Icon icon="fa7-solid:chevron-left" />
	</GalleryButton>
	<GalleryButton
		disabled={scrollIdx === imgsSrcs.length - 1}
		class="hidden absolute top-1/2 -translate-y-1/2 right-0 translate-x-16 transition-opacity md:block"
		onclick={() => scrollInDirection(1)}
	>
		<Icon icon="fa7-solid:chevron-right" />
	</GalleryButton>

	<div
		class="flex gap-4 overflow-x-scroll snap-x snap-mandatory scrollbar-none"
		bind:this={el}
		onscroll={(e) => (scrollLeft = e.currentTarget.scrollLeft)}
	>
		{#each imgsSrcs as { src, alt }, i}
			<BorderedImage
				{src}
				{alt}
				loading="lazy"
				onclick={() => previewImage(i)}
				class="snap-center shrink-0 w-full aspect-video rounded-sm brightness-100 hover:brightness-110 transition-[filter] cursor-pointer"
			/>
		{/each}
	</div>
	{#if imgsSrcs.length > 1}
		{@render dots(imgsSrcs.length, scrollIdx)}
	{/if}
</div>

<ImagePreview
	imgProps={previewImgProps}
	onclose={() => (showPreview = false)}
	show={showPreview}
/>

{#snippet dots(amount: number, activeIdx: number)}
	<div class="w-full flex items-center min-h-2 gap-1.5 justify-center">
		{#each { length: amount } as _, i}
			<div
				class:active={i === activeIdx}
				class="h-1.5 w-1.5 bg-zinc-800 rounded-full transition-[width,margin] [.active]:bg-heading [.active]:w-4 [.active]:mx-1 [.active]:first:ml-0 [.active]:last:mr-0 ease-out"
			></div>
		{/each}
	</div>
{/snippet}
