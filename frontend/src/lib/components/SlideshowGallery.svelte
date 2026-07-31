<script lang="ts">
	import BorderedImage from "./BorderedImage.svelte";
	import GalleryButton from "./GalleryButton.svelte";
	import ImagePreview from "./ImagePreview.svelte";
	import type { HTMLImgAttributes } from "svelte/elements";

	type Props = {
		imgsSrcs: {
			src: HTMLImgAttributes["src"];
			alt: string;
		}[];
	};

	let { imgsSrcs }: Props = $props();

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
		const idx = Math.round(ratio * imgsSrcs.length);
		return idx;
	});

	const previewImage = (idx: number) => {
		previewImgProps = imgsSrcs[idx];
		showPreview = true;
	};

	const scrollInDirection = (direction: number) => {
		if (!el) return;
		const nextIdx = scrollIdx + direction;

		scrollTo(nextIdx);
	};

	const scrollTo = (idx: number) => {
		if (!el) return;

		if (idx >= imgsSrcs.length) {
			el.scrollTo({ left: 0, behavior: "smooth" });
			return;
		}

		let newScrollPos = idx * scrollSize;
		el.scrollTo({ left: newScrollPos, behavior: "smooth" });
	};
</script>

<div class="grid">
	{#if imgsSrcs.length > 1}
		<div class="mb-4 flex justify-between">
			<GalleryButton
				direction="left"
				disabled={scrollIdx === 0}
				onclick={() => scrollInDirection(-1)}
			/>

			<GalleryButton
				direction="right"
				disabled={scrollIdx === imgsSrcs.length - 1}
				onclick={() => scrollInDirection(1)}
			/>
		</div>
	{/if}

	<div
		class="mb-4 scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-scroll"
		bind:this={el}
		onscroll={(e) => (scrollLeft = e.currentTarget.scrollLeft)}
	>
		{#each imgsSrcs as { src, alt }, i}
			<BorderedImage
				{src}
				{alt}
				loading="lazy"
				onclick={() => previewImage(i)}
				class="aspect-video w-full shrink-0 cursor-pointer snap-center rounded-sm brightness-100 transition-[filter] hover:brightness-110"
			/>
		{/each}
	</div>

	{#if imgsSrcs.length > 1}
		<div class="mb-8">
			{@render dots(imgsSrcs.length, scrollIdx)}
		</div>

		<ul class="mb-4 grid grid-cols-4 gap-4 sm:grid-cols-6">
			{#each imgsSrcs as { src, alt }, i}
				<li>
					<button type="button" onclick={() => scrollTo(i)}>
						<BorderedImage
							{src}
							{alt}
							class={["aspect-video h-12", i === scrollIdx ? "brightness-100" : "brightness-50"]}
						/>
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<ImagePreview imgProps={previewImgProps} onclose={() => (showPreview = false)} show={showPreview} />

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
