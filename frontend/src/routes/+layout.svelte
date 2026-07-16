<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
	const navEntries = new Map<string, string>([
		['/', 'Home'],
		['/experience', 'Experience'],
		['/contact', 'Contact']
	]);
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Navbar entries={navEntries} />

<div class="min-h-svh grid py-16 sm:py-32">
	{@render children?.()}
</div>
<Footer />
