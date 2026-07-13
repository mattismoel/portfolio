<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import MultiSelector from '$lib/components/MultiSelector.svelte';
	import SlideshowGallery from '$lib/components/SlideshowGallery.svelte';
	import type { Image } from '$lib/features/project';
	import { uploadImage } from '$lib/features/project.remote';
	import { createTechProject } from '$lib/features/tech-project/tech-project.remote';
	import { iconMap } from '$lib/technology';
	import { listTechnologies } from '$lib/technology.remote';

	const { fields } = createTechProject;

	let images = $state<Image[]>([]);
</script>

<main class="pt-32 px-8">
	<div class="grid gap-16">
		<form
			enctype="multipart/form-data"
			{...uploadImage.enhance(async (form) => {
				if (await form.submit()) {
					if (form.result?.image) {
						createTechProject.fields.images.set([
							...(createTechProject.fields.images.value() || []),
							form.result.image.id
						]);

						images = [...images, form.result.image];
					}
				} else {
					console.error('Hey!');
				}
			})}
		>
			<h2>Images</h2>
			<div class="grid">
				<input {...uploadImage.fields.file.as('file')} />
				<Input {...uploadImage.fields.description.as('text')} placeholder="Description" />
				<SlideshowGallery
					imgsSrcs={images.map(({ src, description }) => ({ src, alt: description }))}
				/>
				<Button>Upload</Button>
			</div>
		</form>

		<form {...createTechProject} class="flex flex-col">
			<h1 class="font-bold text-2xl mb-8">Create Project</h1>

			<fieldset class="mb-8 grid gap-2">
				<Input {...fields.title.as('text')} placeholder="Title" />
				<Input {...fields.description.as('text')} placeholder="Description" />
				<Input {...fields.href.as('url')} placeholder="URL" />
				<Input {...fields.sourceHref.as('url')} placeholder="Source URL" />
				<Input {...fields.finishYear.as('number')} placeholder="Finished Year" />
				<input {...fields.images.as('select multiple')} hidden />
			</fieldset>

			<section class="mb-8">
				<h2 class="mb-4">Technologies</h2>
				{#await listTechnologies() then technologies}
					<MultiSelector
						{...fields.technologies.as('select multiple')}
						options={technologies.map(({ id, name }) => ({
							name,
							value: id,
							icon: iconMap.get(name)
						}))}
					/>
				{/await}
			</section>

			<Button>Create Project</Button>
		</form>
	</div>
</main>
