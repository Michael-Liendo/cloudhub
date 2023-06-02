<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  import { onMount } from 'svelte';

  const cover =
    'https://images.unsplash.com/photo-1685329173725-73914aada9ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80';

  onMount(() => {
    document.documentElement.style.setProperty(
      '--cover-image',
      `url('${cover}')`
    );
  });
</script>

<div class="flex h-screen w-screen">
  <main
    id="login-main"
    class="flex justify-center items-center w-screen md:w-[80%] lg:w-[45%] bg-gradient"
  >
    <Card
      class="w-[25rem] md:shadow-none md:border-none md:p-0 md:!bg-transparent"
    >
      <slot />
    </Card>
  </main>
  <div
    class="bg-slate-700 w-[55%] bg-cover bg-no-repeat hidden md:block"
    style="background-image: url('{cover}');"
  />
</div>

<style>
  .bg-gradient {
    background: radial-gradient(#1d2f41, #21252c);
  }

  @media (max-width: 767px) {
    #login-main {
      background-size: cover;
      background-repeat: no-repeat;
      /* TODO: daily images */
      background-image: var(--cover-image) !important;
    }
  }
</style>
