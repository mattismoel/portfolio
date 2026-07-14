<script lang="ts">
	import FileSelector from '$lib/components/FileSelector.svelte';
	import Form from '$lib/components/Form.svelte';
	import FormField from '$lib/components/FormField.svelte';
	import FormSection from '$lib/components/FormSection.svelte';
	import Input from '$lib/components/Input.svelte';
	import MultiSelector from '$lib/components/MultiSelector.svelte';
	import SlideshowGallery from '$lib/components/SlideshowGallery.svelte';
	import type { Image } from '$lib/features/project';
	import { editImageDescription, uploadImage } from '$lib/features/project.remote';
	import { iconMap } from '$lib/technology';
	import { listTechnologies } from '$lib/technology.remote';
	import { onMount } from 'svelte';
	import type { TechProject } from '../tech-project';
	import type { createTechProject, updateTechProject } from '../tech-project.remote';

	type CreateProps = {
		variant: 'create';
		form: typeof createTechProject;
	};

	type UpdateProps = {
		variant: 'update';
		form: typeof updateTechProject;
		project: TechProject;
	};

	type Props = CreateProps | UpdateProps;

	let props: Props = $props();

	let images = $state<Image[]>([]);

	onMount(() => {
		if (props.variant === 'create') return;

		props.form.fields.set({
			...props.project,
			projectId: props.project.id,
			images: props.project.images.map((i) => i.id),
			technologies: props.project.technologies.map((t) => t.id)
		});

		editImageDescription.fields.imageId.set(props.project.images.at(0)?.id);

		console.log('setting images initially');
		images = [...props.project.images];
	});

	$inspect(props.form.fields.images.value());
</script>

<div class="grid gap-16">
	<Form
		title="Upload Image"
		description="Choose a project image and give it a short and clear description, and upload it."
		uploadBtnText="Upload"
		enctype="multipart/form-data"
		{...uploadImage.enhance(async (form) => {
			if (await form.submit()) {
				if (form.result?.image) {
					console.log('uploaded', form.result.image.id);
					props.form.fields.images.set([
						...(props.form.fields.images.value() || []),
						form.result.image.id
					]);

					console.log('setting images');
					images = [...images, form.result.image];
				}
			} else {
				console.error('Hey!');
			}
		})}
	>
		<FormSection>
			<FormField issues={uploadImage.fields.file.issues()}>
				<FileSelector {...uploadImage.fields.file.as('file')} />
			</FormField>
			<FormField issues={uploadImage.fields.description.issues()}>
				<Input {...uploadImage.fields.description.as('text')} placeholder="Description" />
			</FormField>
		</FormSection>
	</Form>

	{#if images.length > 0}
		<Form title="Edit Images" {...editImageDescription}>
			<input
				{...editImageDescription.fields.imageId.as(
					'hidden',
					editImageDescription.fields.imageId.value() || ''
				)}
			/>

			<SlideshowGallery
				onScroll={(newIdx) => editImageDescription.fields.imageId.set(images[newIdx].id)}
				imgsSrcs={images.map(({ src, description }) => ({ src, alt: description }))}
			/>

			<FormField issues={editImageDescription.fields.description.issues()}>
				<Input
					{...editImageDescription.fields.description.as('text')}
					placeholder="Description"
					value={images.find((i) => i.id === editImageDescription.fields.imageId.value())
						?.description}
				/>
			</FormField>
		</Form>
	{/if}
	<Form title="Create Project" uploadBtnText="Create Project" {...props.form} class="flex flex-col">
		{#if props.variant === 'update'}
			<input {...props.form.fields.projectId.as('hidden', props.project.id)} />
		{/if}

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
</div>
