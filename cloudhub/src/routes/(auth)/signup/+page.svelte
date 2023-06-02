<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import TextField from '../../../lib/components/TextField.svelte';
</script>

<h1 class="font-medium text-4xl md:text-5xl">Sign Up</h1>
<!-- TODO: values -->
<form class="mt-10">
  <div class="grid gap-6 mb-6 md:grid-cols-2">
    <div>
      <TextField
        label="First Name"
        name="name"
        type="text"
        placeholder="John"
        required
      />
    </div>
    <div>
      <TextField
        label="Last name"
        name="last_name"
        type="text"
        placeholder="Doe"
        required
      />
    </div>
  </div>
  <div class="mb-6">
    <TextField
      label="Username"
      name="username"
      type="username"
      placeholder="johndoe"
      required
    />
  </div>
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
  </div>

  <Button type="submit" fullWidth>Sign up</Button>
</form>

<div class="text-right">
  <span>Don't have an account?</span>
  <a href="/login" class="font-medium text-blue-500 hover:underline">Log in</a>
</div>
