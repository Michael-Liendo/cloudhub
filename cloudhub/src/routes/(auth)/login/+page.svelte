<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import TextField from '../../../lib/components/TextField.svelte';
</script>

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
  <a href="/signup" class="font-medium text-blue-500 hover:underline">Sign up</a
  >
</div>
