<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  import { onMount } from 'svelte';

  // TODO: daily images
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
      class="z-20 w-[25rem] md:shadow-none md:border-none md:p-0 bg-gradient-card md:!bg-transparent"
    >
      <slot />
    </Card>
    <div class="gradient fixed rounded-2xl top-48 left-96 w-48 h-48" />
    <div class="gradient fixed rounded-2xl bottom-32 left-20 w-48 h-48" />
  </main>
  <div
    class="bg-slate-700 w-[55%] bg-cover bg-no-repeat hidden md:block"
    style="background-image: url('{cover}');"
  />
</div>

<style>
  .gradient {
    background: radial-gradient(#4f21693b, #00000000);
    box-shadow: 0px 0px 90px #4f21691a;
  }

  .bg-gradient {
    background: radial-gradient(#1d3044, #21252c);
  }

  @media (max-width: 767px) {
    #login-main {
      background-size: cover;
      background-repeat: no-repeat;
      background-image: var(--cover-image) !important;
    }
  }
</style>
