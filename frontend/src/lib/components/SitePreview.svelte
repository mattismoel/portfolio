<script lang="ts">
	import IconContainer from "./IconContainer.svelte";

	type Props = {
		title: string;
		href: string;
	};

	let { title, href }: Props = $props();
</script>

<a
	{title}
	{href}
	target="_blank"
	class="group relative aspect-video w-full overflow-hidden rounded-default hover:shadow-2xl"
>
	<iframe
		{title}
		src={href}
		class="pointer-events-none absolute inset-0 h-[400%] w-[400%] origin-top-left scale-[0.25] transition-[filter] group-hover:brightness-30 sm:h-[250%] sm:w-[250%] sm:scale-[0.4]"
		scrolling="no"
	>
	</iframe>

	<IconContainer
		side="right"
		icon="icon-[boxicons--arrow-out-up-right-square]"
		class="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 font-bold text-text-light underline opacity-0 transition-opacity group-hover:opacity-100"
	>
		Visit site
	</IconContainer>
</a>
