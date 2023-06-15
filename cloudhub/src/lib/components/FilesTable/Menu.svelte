<script lang="ts">
  import { notifications } from '@whizzes/svelte-notifications';
  import MenuIcon from '~icons/mdi/menu';
  import CloseIcon from '~icons/mdi/close';
  import { page } from '$app/stores';

  import { clickOutside } from '$lib/actions/click_outside';

  import type { FileDetails } from '../../../app';
  import { newForm } from '@whizzes/svelte-forms';

  export let file: FileDetails;
  let isDropdownOpen = false;

  async function deleteFile() {
    const request = await fetch(
      `${import.meta.env.VITE_API_URL}/api/files/delete`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `JWT ${$page.data.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: file.name }),
      }
    );

    const response = await request.json();

    if (response.success) {
      notifications.notifySuccess(response.data.message);
      // TODO: REMOVE THIS AND REFRESH COMPONENT
      window.location.href = '/home';
    } else {
      notifications.notifyFailure(response.error.message);
    }
  }

  async function downloadFile() {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/files/download`,
      {
        method: 'POST',
        headers: {
          Authorization: `JWT ${$page.data.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: file.name }),
      }
    );

    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
      notifications.notifySuccess('File download');
    } else {
      console.error(response);
    }
  }

  let isRenameInputOpen = false;

  const { values, handleSubmit } = newForm({
    initialValues: {
      newFileName: '',
    },
    async onSubmit({ newFileName }) {
      const extension =
        file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length) ||
        file.name;

      const request = await fetch(
        `${import.meta.env.VITE_API_URL}/api/files/rename`,
        {
          method: 'PUT',
          headers: {
            Authorization: `JWT ${$page.data.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prevFileName: file.name,
            newFileName: `${newFileName}.${extension}`,
          }),
        }
      );

      const response = await request.json();

      if (response.success) {
        notifications.notifySuccess(`Rename to ${newFileName}`);
        // TODO: REMOVE THIS AND REFRESH COMPONENT
        window.location.href = '/home';
      } else {
        console.error(response);
        notifications.notifyFailure(response.error.message);
      }
    },
  });

  const handleDropdownClick = () => {
    isDropdownOpen = !isDropdownOpen;
  };
</script>

<div class="absolute">
  {#if isDropdownOpen}
    <div
      use:clickOutside
      on:clickOutside={handleDropdownClick}
      id="dropdown"
      class="z-10 right-16 fixed bg-white divide-y divide-gray-500 rounded-lg shadow dark:bg-gray-700"
    >
      <ul class="py-0.5 text-sm text-gray-700 dark:text-gray-200">
        <li>
          <button
            on:click={() => (isRenameInputOpen = !isRenameInputOpen)}
            class="block rounded-lg w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >Rename</button
          >
          {#if isRenameInputOpen}
            <div
              use:clickOutside
              on:clickOutside={() => (isRenameInputOpen = !isRenameInputOpen)}
              id="dropdown"
              class="z-10 right-16 fixed bg-white rounded-lg shadow dark:bg-gray-700"
            >
              <form on:submit={handleSubmit}>
                <label
                  for="rename"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >Rename file</label
                >
                <div class="relative">
                  <input
                    type="text"
                    id="rename"
                    class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="filename"
                    bind:value={$values.newFileName}
                    required
                  />
                  <button
                    type="submit"
                    class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >Rename</button
                  >
                </div>
              </form>
            </div>
          {/if}
        </li>
        <li>
          <button
            on:click={downloadFile}
            class="block rounded-lg w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >Download</button
          >
        </li>
      </ul>
      <ul class="py-0.5 text-sm text-gray-700 dark:text-gray-200">
        <li>
          <button
            on:click={deleteFile}
            class="block rounded-lg w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >Delete</button
          >
        </li>
      </ul>
    </div>
  {/if}
</div>

<button
  on:click={handleDropdownClick}
  type="button"
  class="rounded-full font-medium text-blue-600 hover:underline"
  id="user-menu-button"
  aria-expanded="false"
  data-dropdown-toggle="dropdown-2"
>
  {#if !isDropdownOpen}
    <MenuIcon font-size="20" />
  {:else}
    <CloseIcon font-size="20" />
  {/if}
</button>
