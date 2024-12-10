<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <BaseCard
      v-for="item in items"
      :key="item.id"
      :image="item.image"
      :title="item.title"
      :description="item.description"
      layout="vertical"
    >
      <template #actions>
        <nuxt-link
          :to="item.link"
          class="bg-gray-100 text-gray-800 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200"
        >
          View Details
        </nuxt-link>
      </template>
    </BaseCard>
  </div>
</template>

<script setup>
import BaseCard from '../Cards/BaseCard.vue';

// Define Props with Debugging
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

console.log('Items in GridView:', props.items); // Debugging the items value

</script>
