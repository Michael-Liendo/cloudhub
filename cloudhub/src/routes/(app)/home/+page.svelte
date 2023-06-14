<script lang="ts">
  import FilesTable from '$lib/components/FilesTable/';

  export let data;
</script>

<svelte:head>
  <title>Home | {data.user.first_name}'s files</title>
</svelte:head>
<h1 class="text-4xl my-5 ml-5">
  Hello {data.user.first_name}
  {data.user.last_name}.
</h1>

<FilesTable />
