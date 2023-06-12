<script lang="ts">
  import { page } from '$app/stores';
  import { clickOutside } from '$lib/actions/click_outside';
  import type { FileDetails } from '../../../app';

  export let file: FileDetails;
  let isDropdownOpen = false;

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
    } else {
      console.error('Error downloading file');
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
      class="z-10 right-16 fixed bg-white divide-y divide-gray-700 w-32 rounded-lg shadow dark:bg-gray-700"
    >
      <ul
        class="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefaultButton"
      >
        <button
          on:click={downloadFile}
          class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          Download
        </button>
      </ul>
      <ul
        class="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefaultButton"
      >
        <li
          class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          Delete
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
  Menu
</button>
