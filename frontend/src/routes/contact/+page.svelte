<script lang="ts">
	import IconContainer from '$lib/components/IconContainer.svelte';
	import ResponsiveLink from '$lib/components/ResponsiveLink.svelte';
	import { socials, type Social } from '$lib/personal';
</script>

<svelte:head>
	<title>Mattis Møl Kristensen | Contact</title>
	<meta name="description" content="The contact page of Mattis Møl Kristensen" />
</svelte:head>

<main class="grid min-h-svh">
	<div class="flex-1 flex flex-col justify-center items-center">
		<div>
			<h1 class="font-bold text-text-light mb-4">Catch me here:</h1>
			<ul class="grid gap-2">
				{#each socials as social}
					{@render socialEntry(social)}
				{/each}
			</ul>
		</div>
	</div>
</main>

{#snippet socialEntry({ name, url, text, iconName }: Social)}
	<li class="group relative w-fit">
		<ResponsiveLink title={name} href={url}>
			<IconContainer icon={iconName}>
				{name}
			</IconContainer>
		</ResponsiveLink>

		<IconContainer
			icon="icon-[boxicons--arrow-right]"
			spacing="tight"
			iconClass="size-6"
			class="absolute text-text-light/30 opacity-0 right-0 group-hover:-right-2 top-1/2 translate-x-full -translate-y-1/2 group-hover:opacity-100 transition-[right,opacity]"
		>
			<p class="whitespace-nowrap">{text}</p>
		</IconContainer>
	</li>
{/snippet}
