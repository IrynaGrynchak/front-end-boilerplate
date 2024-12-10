<template>
    <h1 class="text-4xl font-extrabold capitalize text-gray-800 mb-4">
      {{ name }}
    </h1>
  </template>
  
  <script>
  export default {
    props: {
      name: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  