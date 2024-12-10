<template>
    <UCard class="border rounded-lg shadow-sm hover:shadow-lg transition-shadow">
        <div class="flex w-full items-center">
            <!-- Left Section: Image and Title -->
            <div class="flex items-center space-x-4 flex-grow">
                <!-- Image -->
                <div class="w-16 h-16 overflow-hidden rounded-lg flex-shrink-0">
                    <img
                    :src="image"
                    :alt="title || 'Image'"
                    class="object-cover w-full h-full"
                    />
                </div>

                <!-- Title -->
                <h3 v-if="title" class="text-lg font-semibold text-gray-800">
                    {{ title }}
                </h3>
            
            </div>

            <!-- Right Section: Details Button -->
            <div class="flex-shrink-0">
                <slot name="actions" />
            </div>
        </div>
    </UCard>
</template>
  
  <script setup>
  const props = defineProps(['image', 'title']);
  </script>
  