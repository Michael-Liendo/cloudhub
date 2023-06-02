<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import TextField from '../../../lib/components/TextField.svelte';

  const cover =
    'https://images.unsplash.com/photo-1685438436929-108c5050855d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
</script>

<div class="flex h-screen w-screen">
  <main
    id="login-main"
    class="flex justify-center items-center w-screen md:w-[80%] lg:w-[45%] bg-gradient"
  >
    <Card
      class="w-[25rem] md:shadow-none md:border-none md:p-0 md:!bg-transparent"
    >
      <h1 class="font-medium text-4xl md:text-5xl">Log in</h1>
      <!-- TODO: values -->
      <form class="mt-10">
        <div class="mb-6">
          <TextField
            label="Email address"
            name="email"
            type="email"
            placeholder="john.doe@company.com"
            required
          />
        </div>
        <div class="mb-6">
          <TextField
            label="Password"
            name="password"
            type="password"
            placeholder="* * * * * * *"
            required
          />
          <!-- TODO: put in the right -->
          <a href="#todo" class=" font-medium text-blue-500 hover:underline"
            >Forgot password?</a
          >
        </div>

        <Button type="submit" fullWidth>Log in</Button>
      </form>

      <div class="text-right">
        <span>Don't have an account?</span>
        <a href="/signup" class="font-medium text-blue-500 hover:underline"
          >Sign up</a
        >
      </div>
    </Card>
  </main>
  <div
    class="bg-slate-700 w-[55%] bg-cover bg-no-repeat hidden md:block"
    style="background-image: url('{cover}');"
  />
</div>

<style>
  .bg-gradient {
    background: radial-gradient(#1f2e3d, #21252c);
  }

  @media (max-width: 767px) {
    #login-main {
      background-size: cover;
      background-repeat: no-repeat;
      /* TODO: daily images */
      background-image: url('https://images.unsplash.com/photo-1685438436929-108c5050855d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80') !important;
    }
  }
</style>
