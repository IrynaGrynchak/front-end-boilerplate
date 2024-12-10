<template>
    <div class="flex justify-center">
      <img
        :src="src"
        :alt="alt"
        class="max-w-full h-auto rounded-lg shadow-md"
      />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      src: {
        type: String,
        required: true,
      },
      alt: {
        type: String,
        default: "Image",
      },
    },
  };
  </script>
  