<template>
    <div>
        <span class="font-semibold text-gray-800 pr-2">{{ title }}:</span>
            <span
              v-for="(type, index) in types"
              :key="type.type.name"
              class="inline-block px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800 mr-2"
            >
              {{ type.type.name }}
            </span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      types: {
        type: Array || String,
        required: true,
      },
    },
  };
  </script>
  