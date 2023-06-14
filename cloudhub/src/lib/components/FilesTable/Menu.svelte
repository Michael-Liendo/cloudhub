<script lang="ts">
  import { notifications } from '@whizzes/svelte-notifications';
  import MenuIcon from '~icons/mdi/menu';
  import CloseIcon from '~icons/mdi/close';
  import { page } from '$app/stores';

  import { clickOutside } from '$lib/actions/click_outside';

  import type { FileDetails } from '../../../app';

  export let file: FileDetails;
  let isDropdownOpen = false;

  async function deleteFile() {
    const request = await fetch(
      `${import.meta.env.VITE_API_URL}/api/files/files`,
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
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
        <li>
          <button
            on:click={downloadFile}
            class="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >Download</button
          >
        </li>

        <li>
          <button
            on:click={deleteFile}
            class="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
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
