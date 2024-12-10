<template>
  <div class="max-w-4xl mx-auto p-4">
    <!-- Back to Overview Link -->
    <BackLink to="/rickandmorty" text="Back to Rick and Morty List" />

     <!-- Spinner -->
     <LoadingSpinner v-if="loading" />

    <div v-else-if="character" class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-6">
      <Image :src="character.image" :alt="character.name" />
      <div class="flex flex-col justify-center">
        <Name :name="character.name" />
       
        <div class="text-lg text-gray-600 space-y-2">
          <Details :title="'Species'" :value="character.species" />
          <Details :title="'Gender'" :value="character.gender" />
          <Details :title="'Status'" :value="character.status" />
          <Details :title="'Origin'" :value="character.origin.name" />
          <Details :title="'Location'" :value="character.location.name" />
        </div>
      </div>
    </div>

    <div v-else>
      <error-message :topic="'Character'" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useApi } from '~/composables/useApi';
import LoadingSpinner from '~/components/Utilities/LoadingSpinner.vue';
import BackLink from '~/components/Navigation/BackLink.vue';
import Name from '~/components/Sections/Name.vue';
import Image from '~/components/Sections/Image.vue';
import Details from '~/components/Sections/Details.vue';
import ErrorMessage from '~/components/Sections/ErrorMessage.vue';

// API and Route Setup
const { fetchData } = useApi('https://rickandmortyapi.com/api/');
const route = useRoute();

// State
const character = ref(null);
const loading = ref(true);

const fetchCharacterDetails = async () => {
  try {
    const response = await fetchData(`character/${route.params.id}`);
    character.value = response || null;
  } catch (error) {
    console.error('Error fetching character details:', error);
    character.value = null;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCharacterDetails();
});
</script>
