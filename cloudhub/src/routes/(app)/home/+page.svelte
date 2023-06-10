<script lang="ts">
  export let data;
</script>

<h1>Hello {data.user.first_name} {data.user.last_name}</h1>

<h1>Files uploads</h1>

{#each data.files as file}
  <p>{file.name}</p>
{/each}
