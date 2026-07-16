<script lang="ts">
	import BorderedImage from './BorderedImage.svelte';
	import GalleryButton from './GalleryButton.svelte';
	import ImagePreview from './ImagePreview.svelte';
	import type { HTMLImgAttributes } from 'svelte/elements';

	type Props = {
		imgsSrcs: {
			src: HTMLImgAttributes['src'];
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
		console.log(previewImgProps);
		showPreview = true;
	};

	const scrollInDirection = (direction: number) => {
		console.log('hey!');
		if (!el) return;
		const nextIdx = scrollIdx + direction;

		scrollTo(nextIdx);
	};

	const scrollTo = (idx: number) => {
		if (!el) return;

		if (idx >= imgsSrcs.length) {
			el.scrollTo({ left: 0, behavior: 'smooth' });
			return;
		}

		console.log('prev', scrollIdx, 'new', idx);
		let newScrollPos = idx * scrollSize;
		el.scrollTo({ left: newScrollPos, behavior: 'smooth' });
	};
</script>

<div class="grid">
	<div class="flex justify-between mb-4">
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
	<div
		class="flex gap-4 overflow-x-scroll snap-x snap-mandatory scrollbar-none mb-4"
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
		<div class="mb-8">
			{@render dots(imgsSrcs.length, scrollIdx)}
		</div>

		<ul class="grid grid-cols-4 sm:grid-cols-6 mb-4 gap-4">
			{#each imgsSrcs as { src, alt }, i}
				<li>
					<button type="button" onclick={() => scrollTo(i)}>
						<BorderedImage
							{src}
							{alt}
							class={['aspect-video h-12', i === scrollIdx ? 'brightness-100' : 'brightness-50']}
						/>
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<ImagePreview imgProps={previewImgProps} onclose={() => (showPreview = false)} show={showPreview} />

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
