<script lang="ts">
  import { newForm } from '@whizzes/svelte-forms';
  import * as Yup from 'yup';
  import Button from '$lib/components/Button.svelte';
  import TextField from '$lib/components/TextField.svelte';
  import { notifications } from '@whizzes/svelte-notifications';

  export let data;

  const { handleSubmit, values, errors } = newForm({
    initialValues: {
      avatar: '',
      first_name: '',
      last_name: '',
      username: '',
    },
    validationSchema: Yup.object({
      avatar: Yup.string().url(),
      first_name: Yup.string(),
      last_name: Yup.string(),
      username: Yup.string(),
    }),
    async onSubmit(values, helpers) {
      let cleanValues = Object.fromEntries(
        Object.entries(values).filter(([_, v]) => v != '' || null)
      );
      const request = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/user`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${data.accessToken}`,
          },
          method: 'PUT',
          body: JSON.stringify(cleanValues),
        }
      );

      const response = await request.json();

      if (response.statusCode == 400) {
        response.error?.errorFields?.forEach(
          (error: { field: any; message: string }) => {
            helpers.setFieldError(error.field, error.message);
          }
        );
      }

      if (response.success) {
        notifications.notifySuccess('Data updated!');
        window.location.href = '/home';
      } else {
        notifications.notifyFailure(response.error.message);
        console.error(response);
      }
    },
  });
</script>

<svelte:head>
  <title>Settings | Update {data.user.first_name}'s settings</title>
</svelte:head>

<div class="max-w-lg mx-auto bg-gray-900 text-white p-8 rounded-lg">
  <h2 class="text-2xl font-bold mb-6">Account Settings</h2>
  <form on:submit={handleSubmit}>
    <div class="flex items-center mb-4">
      <div class="w-16 h-16 rounded-full overflow-hidden mr-4">
        {#if data.user.avatar}
          <img
            src={data.user.avatar}
            alt="Avatar"
            class="w-full h-full object-cover"
          />
        {:else}
          <div
            class="bg-gray-800 text-gray-100 flex items-center justify-center w-full h-full text-3xl"
          >
            {data.user.first_name.charAt(0)}
          </div>
        {/if}
      </div>
      <div>
        <TextField
          name="avatar"
          type="text"
          label="Avatar Url"
          class="w-full"
          bind:value={$values.avatar}
          error={$errors.avatar}
          placeholder="https://www.w3schools.com/howto/img_avatar.png"
        />
      </div>
    </div>

    <div class="mb-4">
      <TextField
        name="first_name"
        placeholder={data.user.first_name}
        bind:value={$values.first_name}
        error={$errors.first_name}
        label="First Name"
      />
    </div>
    <div class="mb-4">
      <TextField
        name="last_name"
        placeholder={data.user.last_name}
        bind:value={$values.last_name}
        error={$errors.last_name}
        label="Last Name"
      />
    </div>
    <div class="mb-4">
      <TextField
        name="username"
        placeholder={data.user.username}
        bind:value={$values.username}
        error={$errors.username}
        label="Username"
      />
    </div>
    <div class="flex justify-end">
      <Button type="submit">Save changes</Button>
    </div>
  </form>
</div>
