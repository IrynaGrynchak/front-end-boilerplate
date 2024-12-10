<template>
    <div>
      <p>
        <span class="font-semibold text-gray-800">{{ title }}:</span>
        {{ value }} 
      </p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      value: {
        type: String || Number,
        required: true,
      },
    },
  };
  </script>
  