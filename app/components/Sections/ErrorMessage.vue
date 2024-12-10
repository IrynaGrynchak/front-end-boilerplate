<template>
    <p class="text-red-500 text-center mt-6 text-lg">
      Failed to load {{ topic }} details. Please try again later.
    </p>
  </template>
  
  <script>
  export default {
    props: {
      topic: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  