<script lang="ts">
	import type { HTMLAttributes, HTMLImgAttributes } from "svelte/elements";

	type Props = Pick<HTMLImgAttributes, "src" | "alt" | "loading"> & HTMLAttributes<HTMLDivElement>;

	const { src, alt, loading, ...rest }: Props = $props();
</script>

<div {...rest} class={["relative isolate h-full w-auto shrink-0", rest.class]}>
	<img
		{src}
		{alt}
		{...rest}
		class={[
			"absolute top-0 left-0 -z-10 h-full w-full object-cover mix-blend-screen brightness-175",
			rest.class,
		]}
	/>
	<img
		{src}
		{alt}
		{loading}
		aria-hidden="true"
		class={["h-full w-full object-cover p-[1px]", rest.class]}
	/>
</div>
