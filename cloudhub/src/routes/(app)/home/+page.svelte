<script lang="ts">
  import Navbar from '$lib/components/Navbar/Navbar.svelte';

  export let data;
</script>

<Navbar />
<h1>Hello {data.user.first_name} {data.user.last_name}</h1>
