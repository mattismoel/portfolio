<script lang="ts">
	import Form from '$lib/components/Form.svelte';
	import FormField from '$lib/components/FormField.svelte';
	import FormSection from '$lib/components/FormSection.svelte';
	import Input from '$lib/components/Input.svelte';
	import MultiSelector from '$lib/components/MultiSelector.svelte';
	import SlideshowGallery from '$lib/components/SlideshowGallery.svelte';
	import type { Image } from '$lib/features/project';
	import { uploadImage } from '$lib/features/project.remote';
	import { iconMap } from '$lib/technology';
	import { listTechnologies } from '$lib/technology.remote';
	import type { TechProject } from '../tech-project';
	import type { createTechProject, updateTechProject } from '../tech-project.remote';

	type CreateProps = {
		form: typeof createTechProject;
	};

	type UpdateProps = {
		form: typeof updateTechProject;
		techProject: TechProject;
	};

	type Props = CreateProps | UpdateProps;

	let props: Props = $props();

	let images = $state<Image[]>([]);
</script>

<Form
	title="Project Images"
	description="Choose a project image and give it a short and clear description, and upload it."
	uploadBtnText="Upload"
	enctype="multipart/form-data"
	{...uploadImage.enhance(async (form) => {
		if (await form.submit()) {
			if (form.result?.image) {
				props.form.fields.images.set([
					...(props.form.fields.images.value() || []),
					form.result.image.id
				]);

				images = [...images, form.result.image];
			}
		} else {
			console.error('Hey!');
		}
	})}
>
	<FormSection title="Upload Image">
		<FormField issues={uploadImage.fields.file.issues()}>
			<input {...uploadImage.fields.file.as('file')} />
		</FormField>
		<FormField issues={uploadImage.fields.description.issues()}>
			<Input {...uploadImage.fields.description.as('text')} placeholder="Description" />
		</FormField>
		<SlideshowGallery
			imgsSrcs={images.map(({ src, description }) => ({ src, alt: description }))}
		/>
	</FormSection>
</Form>

<Form title="Create Project" uploadBtnText="Create Project" {...props.form} class="flex flex-col">
	<FormSection title="General">
		<div class="flex gap-2">
			<FormField issues={props.form.fields.title.issues()} class="w-full">
				<Input {...props.form.fields.title.as('text')} placeholder="Title" class="w-full" />
			</FormField>
			<FormField issues={props.form.fields.finishYear.issues()}>
				<Input {...props.form.fields.finishYear.as('number')} placeholder="Finished Year" />
			</FormField>
		</div>

		<FormField issues={props.form.fields.description.issues()}>
			<Input {...props.form.fields.description.as('text')} placeholder="Description" />
		</FormField>

		<div class="grid grid-cols-2 gap-2">
			<FormField issues={props.form.fields.href.issues()}>
				<Input {...props.form.fields.href.as('url')} placeholder="URL" />
			</FormField>
			<FormField issues={props.form.fields.sourceHref.issues()}>
				<Input {...props.form.fields.sourceHref.as('url')} placeholder="Source URL" />
			</FormField>
		</div>

		<input {...props.form.fields.images.as('select multiple')} hidden />
	</FormSection>

	<FormSection
		title="Technologies"
		description="Select the technologies used for creating this project."
	>
		{#await listTechnologies() then technologies}
			<FormField issues={props.form.fields.technologies.issues()}>
				<MultiSelector
					{...props.form.fields.technologies.as('select multiple')}
					options={technologies.map(({ id, name }) => ({
						name,
						value: id,
						icon: iconMap.get(name)
					}))}
				/>
			</FormField>
		{/await}
	</FormSection>
</Form>
