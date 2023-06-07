<script lang="ts">
  import { newForm } from '@whizzes/svelte-forms';
  import * as Yup from 'yup';

  import Button from '$lib/components/Button.svelte';
  import TextField from '../../../lib/components/TextField.svelte';

  const { handleSubmit, values, errors, isSubmitting } = newForm({
    initialValues: {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required('First name is required.'),
      last_name: Yup.string().required('Last name is required.'),
      username: Yup.string()
        .required('Username is required.')
        .matches(
          /^[a-zA-Z0-9_-]+$/,
          'Username can only contain letters, numbers, hyphens, and underscores.'
        )
        .min(3, 'Username must be at least 3 characters.')
        .max(20, 'Username cannot exceed 20 characters.'),
      email: Yup.string()
        .required('Email is required.')
        .email('Enter a valid email address.'),
      password: Yup.string()
        .required('Password is required.')
        .min(8, 'Password must be at least 8 characters.')
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z]).{8,}$/,
          'Password must contain lowercase, uppercase, number, and special character.'
        ),
    }),
    async onSubmit(values, helpers) {
      const request = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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
  <title>Sign up</title>
</svelte:head>

<h1 class="font-medium text-3xl sm:text-4xl md:text-5xl w-max">
  Sign Up | CloudHub
</h1>
<form on:submit={handleSubmit} class="mt-10">
  <div class="grid gap-6 mb-6 md:grid-cols-2">
    <div>
      <TextField
        label="First Name"
        name="first_name"
        type="text"
        placeholder="John"
        bind:value={$values.first_name}
        error={$errors.first_name}
      />
    </div>
    <div>
      <TextField
        label="Last Name"
        name="last_name"
        type="text"
        placeholder="Doe"
        bind:value={$values.last_name}
        error={$errors.last_name}
      />
    </div>
  </div>
  <div class="mb-6">
    <TextField
      label="Username"
      name="username"
      type="text"
      placeholder="johndoe"
      bind:value={$values.username}
      error={$errors.username}
    />
  </div>
  <div class="mb-6">
    <TextField
      label="Email address"
      name="email"
      type="email"
      placeholder="john.doe@company.com"
      bind:value={$values.email}
      error={$errors.email}
    />
  </div>
  <div class="mb-10">
    <TextField
      label="Password"
      name="password"
      type="password"
      placeholder="* * * * * * * * *"
      bind:value={$values.password}
      error={$errors.password}
    />
  </div>

  <Button disabled={$isSubmitting} type="submit" fullWidth>Sign up</Button>
</form>

<div class="text-right">
  <span>Don't have an account?</span>
  <a href="/login" class="font-medium text-blue-500 hover:underline">Log in</a>
</div>
