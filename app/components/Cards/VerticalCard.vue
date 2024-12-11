<template>
    <UCard class="border rounded-lg shadow-sm hover:shadow-lg transition-shadow">
        <div class="w-full">
            <!-- Image -->
            <div v-if="image" class="w-full h-40 overflow-hidden rounded-lg mb-4">
                <img
                    :src="image"
                    :alt="title || 'Image'"
                    class="object-cover w-full h-full"
                />
            </div>
            <!-- Title -->
            <h3 v-if="title" class="text-lg font-semibold text-gray-800 mb-2">
                {{ title }}
            </h3>

            <p v-if="description" class="text-sm text-gray-600 mb-4">
                    {{ description }}
                </p>
            <!-- Details Button -->
            <div>
                <slot name="actions" />
            </div>
        </div>
    </UCard>
  </template>

<script setup>
const props = defineProps(['image', 'title', 'description']);
</script>
  