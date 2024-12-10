<template>
  <div class="flex flex-col space-y-4">
    <BaseCard
      v-for="item in items"
      :key="item.key"
      :image="item.image"
      :title="item.title"
      layout="horizontal"
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

const props = defineProps({
  items: Array,
});
</script>
