<script lang="ts">
  import { page } from '$app/stores';
  import { clickOutside } from '$lib/actions/click_outside';
  import { notifications } from '@whizzes/svelte-notifications';
  import Button from '../Button.svelte';
  import { newForm } from '@whizzes/svelte-forms';

  let isDropdownOpen = false;
  const handleDropdownClick = () => {
    isDropdownOpen = !isDropdownOpen;
  };

  let input: any;

  const { handleSubmit } = newForm({
    initialValues: {
      files: null,
    },
    async onSubmit() {
      let data = new FormData();

      for (let i = 0; i < input.files.length; i++) {
        data.append('files', input.files[i]);
      }

      const request = await fetch(
        `${import.meta.env.VITE_API_URL}/api/files/upload`,
        {
          method: 'POST',
          headers: {
            Authorization: `JWT ${$page.data.accessToken}`,
          },
          body: data,
        }
      );

      const response = await request.json();

      if (response.success) {
        notifications.notifySuccess('Files uploaded!');

        // TODO: REMOVE THIS AND REFRESH COMPONENT
        window.location.href = '/home';
      } else {
        notifications.notifyFailure(response.error.message || response.error);
        console.error(response);
      }
    },
  });
</script>

<Button
  type="button"
  class="!bg-green-700 !rounded-3xl focus:!border-none"
  on:click={handleDropdownClick}>Upload files</Button
>
{#if isDropdownOpen}
  <div
    use:clickOutside
    on:clickOutside={handleDropdownClick}
    id="dropdown"
    class="z-10 fixed w-72 right-36 top-14 px-2.5 py-2.5 bg-gray-800 divide-y divide-gray-700 rounded-lg shadow"
  >
    <form on:submit={handleSubmit}>
      <div class="mb-4">
        <label
          class="block mb-2 font-medium text-gray-900 dark:text-white"
          for="file">Upload file</label
        >
        <input
          class="block w-full text-gray-900 border rounded-lg cursor-pointer focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
          id="input"
          bind:this={input}
          multiple
          required
          type="file"
        />
      </div>
      <Button type="submit" fullWidth class="!bg-green-700">Upload file</Button>
    </form>
  </div>
{/if}

<style>
  #input::file-selector-button {
    background-color: rgb(60, 79, 99);
    border: none;
    color: #0c1318;
  }
</style>
