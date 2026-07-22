<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type Props = HTMLAnchorAttributes & {
		alwaysUnderline?: boolean;
	};

	let { alwaysUnderline = true, ...rest }: Props = $props();
</script>

<a
	{...rest}
	class={[
		'underline decoration-text/20 underline-offset-4 transition-colors hover:text-text-light hover:decoration-text-light/50',
		!alwaysUnderline && 'sm:decoration-transparent',
		rest.class
	]}
>
	{@render rest.children?.()}
</a>
