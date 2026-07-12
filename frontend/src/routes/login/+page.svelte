<script>
	import { login } from '$lib/auth.remote';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
</script>

<main class="flex items-center justify-center">
	<form class="grid" {...login}>
		<h1 class="font-bold text-2xl mb-4">Login</h1>

		<fieldset class="grid gap-2 mb-2">
			<Input {...login.fields.email.as('email')} placeholder="Email" />
			<Input {...login.fields.password.as('password')} placeholder="Password" />
		</fieldset>

		<Button>Login</Button>
	</form>
</main>
