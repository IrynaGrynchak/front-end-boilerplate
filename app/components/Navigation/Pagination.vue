<template>
    <div class="w-full bg-gray-100 py-4 flex justify-center items-center space-x-4 shadow-lg">
      <button
        @click="$emit('page-change', currentPage - 1)"
        :disabled="currentPage === 1"
        class="w-24 px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed text-center"
      >
        Previous
      </button>
      <span class="px-4 py-2 text-sm text-gray-700 font-medium">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button
        @click="$emit('page-change', currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="w-24 px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed text-center"
      >
        Next
      </button>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  });
  </script>
  