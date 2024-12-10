<template>
    <nuxt-link
      :to="to"
      class="flex items-center text-green-600 hover:text-green-800 font-medium transition duration-200 pb-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      {{ text }}
    </nuxt-link>
  </template>
  
  <script setup>
  defineProps({
    to: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  });
  </script>
  