<script lang="ts">
	import BorderedImage from "./BorderedImage.svelte";
	import GalleryButton from "./GalleryButton.svelte";
	import SitePreview from "./SitePreview.svelte";

	type ImgSrc = {
		type: "image";
		src: string;
		alt: string;
	};

	type PreviewSrc = {
		type: "preview";
		title: string;
		href: string;
	};

	export type SlideshowSrc = ImgSrc | PreviewSrc;

	type Props = {
		srcs: SlideshowSrc[];
	};

	let { srcs }: Props = $props();

	let el = $state<HTMLDivElement>();

	let scrollLeft = $state(0);

	let scrollSize = $derived.by(() => {
		if (!el) return 0;
		return el.scrollWidth / srcs.length;
	});

	let scrollIdx = $derived.by(() => {
		if (!el) return 0;
		const ratio = scrollLeft / el.scrollWidth;
		const idx = Math.round(ratio * srcs.length);
		return idx;
	});

	const scrollInDirection = (direction: number) => {
		if (!el) return;
		const nextIdx = scrollIdx + direction;

		scrollTo(nextIdx);
	};

	const scrollTo = (idx: number) => {
		if (!el) return;

		if (idx >= srcs.length) {
			el.scrollTo({ left: 0, behavior: "smooth" });
			return;
		}

		let newScrollPos = idx * scrollSize;
		el.scrollTo({ left: newScrollPos, behavior: "smooth" });
	};
</script>

<div class="grid">
	<div
		class="mb-4 scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-scroll"
		bind:this={el}
		onscroll={(e) => (scrollLeft = e.currentTarget.scrollLeft)}
	>
		{#each srcs as src}
			{#if src.type === "image"}
				<BorderedImage
					src={src.src}
					alt={src.alt}
					loading="lazy"
					class="aspect-video w-full shrink-0 snap-center rounded-default"
				/>
			{:else}
				<div class="grid aspect-video w-full shrink-0 snap-center">
					<SitePreview href={src.href} title={src.title} />
				</div>
			{/if}
		{/each}
	</div>

	{#if srcs.length > 1}
		<div class="mb-4 flex items-center justify-between">
			<GalleryButton
				direction="left"
				disabled={scrollIdx === 0}
				onclick={() => scrollInDirection(-1)}
			/>

			{@render dots(srcs.length, scrollIdx)}

			<GalleryButton
				direction="right"
				disabled={scrollIdx === srcs.length - 1}
				onclick={() => scrollInDirection(1)}
			/>
		</div>
	{/if}
</div>

{#snippet dots(amount: number, activeIdx: number)}
	<div class="flex min-h-2 w-full items-center justify-center gap-1.5">
		{#each { length: amount } as _, i}
			<div
				class:active={i === activeIdx}
				class="h-1.5 w-1.5 rounded-full bg-zinc-800 transition-[width,margin] ease-out [.active]:mx-1 [.active]:w-4 [.active]:bg-heading [.active]:first:ml-0 [.active]:last:mr-0"
			></div>
		{/each}
	</div>
{/snippet}
