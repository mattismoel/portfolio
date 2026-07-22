<script lang="ts">
	import IconContainer from '$lib/components/IconContainer.svelte';
	import ResponsiveLink from '$lib/components/ResponsiveLink.svelte';
</script>

<svelte:head>
	<title>Mattis Møl Kristensen | Contact</title>
	<meta name="description" content="The contact page of Mattis Møl Kristensen" />
</svelte:head>

<main class="grid">
	<div class="flex-1 flex flex-col justify-center items-center gap-4">
		<span class="font-bold text-text-light">Catch me here:</span>
		<div class="flex flex-col items-center gap-2">
			<ResponsiveLink href="mailto:mattismoel@gmail.com">
				<IconContainer icon="icon-[boxicons--envelope]">mattismoel@gmail.com</IconContainer>
			</ResponsiveLink>
			<ResponsiveLink href="tel:+4542157066">
				<IconContainer icon="icon-[boxicons--phone]">+4542157066</IconContainer>
			</ResponsiveLink>
		</div>
	</div>
</main>
