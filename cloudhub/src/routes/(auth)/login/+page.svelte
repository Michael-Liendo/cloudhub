<script lang="ts">
  import { newForm } from '@whizzes/svelte-forms';
  import * as Yup from 'yup';

  import Button from '$lib/components/Button.svelte';
  import TextField from '../../../lib/components/TextField.svelte';

  const { handleSubmit, values, errors, isSubmitting } = newForm({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username or Email is required.'),
      password: Yup.string().required('Password is required.'),
    }),
    async onSubmit(values, helpers) {
      const request = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(values),
        }
      );
      const response = await request.json();

      if (!response.success) console.log(response);

      if (response.statusCode == 400) {
        response.error?.errorFields?.forEach(
          (error: { field: any; message: string }) => {
            helpers.setFieldError(error.field, error.message);
          }
        );
      } else if (response.statusCode == 401) {
        helpers.setFieldError('username', 'Invalid username.');
        helpers.setFieldError('password', 'Invalid password.');
      }
      if (response.success) {
        window.location.href = '/home';
      } else {
        console.error(response);
      }
    },
  });
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<h1 class="font-medium text-3xl sm:text-4xl md:text-5xl w-max">
  Log In | CloudHub
</h1>
<form on:submit={handleSubmit} class="mt-10">
  <div class="mb-6">
    <TextField
      label="Username or Email"
      name="username"
      type="text"
      placeholder="john"
      bind:value={$values.username}
      error={$errors.username}
    />
  </div>
  <div class="mb-10 relative">
    <TextField
      label="Password"
      name="password"
      type="password"
      placeholder="* * * * * * *"
      bind:value={$values.password}
      error={$errors.password}
    />
    <a
      href="#todo"
      class="font-medium absolute right-0 text-blue-500 hover:underline"
      >Forgot password?</a
    >
  </div>

  <Button disabled={$isSubmitting} type="submit" fullWidth>Log in</Button>
</form>

<div class="text-right">
  <span>Don't have an account?</span>
  <a href="/signup" class="font-medium text-blue-500 hover:underline">Sign up</a
  >
</div>
