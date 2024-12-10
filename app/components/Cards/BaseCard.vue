<template>
 <div>
    <component :is="layoutComponent" v-bind="$props">
     <!-- Pass slots -->
      <slot />
      <template #actions>
        <slot name="actions" />
      </template>
    </component>
  </div>
</template>

<script setup>
import HorizontalCard from './HorizontalCard.vue';  
import VerticalCard from './VerticalCard.vue';
import { computed } from 'vue';

// Define props
const props = defineProps({
  layout: {
    type: String,
    default: 'vertical', // Default layout
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
});

// Use the `layout` from props
const layoutComponent = computed(() =>
  props.layout === 'horizontal' ? HorizontalCard : VerticalCard
);

console.log('Layout in BaseCard:', props.layout); // Debugging the layout value
console.log('Image in BaseCard:', props.image); // Debugging the image value
console.log('Title in BaseCard:', props.title); // Debugging the title value
console.log('Description in BaseCard:', props.description); // Debugging the description value
</script>



