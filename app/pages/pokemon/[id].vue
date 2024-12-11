<template>
  <div class="max-w-4xl mx-auto p-6">
    <!-- Back to Overview Link -->
    <BackLink 
      :to="{ path: '/pokemon', query: { viewMode: route.query.viewMode } }" 
      text="Back to Pokémon List" 
    />

    <!-- Spinner -->
    <LoadingSpinner v-if="loading" />

    <!-- Pokémon Details -->
    <div v-else-if="pokemon" class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-6">
      <!-- Pokémon Image -->
      <Image :src="pokemonImage" :alt="pokemon.name" />
      <div class="flex flex-col justify-center">
        <Name :name="pokemon.name" />
       
        <div class="text-lg text-gray-600 space-y-2">
          <Details :title="'Height'" :value="`${pokemon.height / 10} m`" />
          <Details :title="'Weight'" :value="`${pokemon.weight / 10} kg`" />
          <Types :title="'Types'" :types="pokemon.types" />
        </div>
        
      </div>
    </div>

    <!-- Error Message -->
    <div v-else>
      <error-message :topic="'Pokémon'" />
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { useApi } from '~/composables/useApi';
import { useRoute } from 'vue-router';
import LoadingSpinner from '~/components/Utilities/LoadingSpinner.vue';
import BackLink from '~/components/Navigation/BackLink.vue';
import Name from '~/components/Sections/Name.vue';
import Image from '~/components/Sections/Image.vue';
import Details from '~/components/Sections/Details.vue';
import Types from '~/components/Sections/Types.vue';
import ErrorMessage from '~/components/Sections/ErrorMessage.vue';

// API and Route Setup
const { fetchData } = useApi('https://pokeapi.co/api/v2/');
const route = useRoute();

// State
const pokemon = ref(null);
const loading = ref(true);

// Fetch Pokémon Details
const fetchPokemonDetails = async () => {
  try {
    const response = await fetchData(`pokemon/${route.params.id}`);
    pokemon.value = response || null;
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
    pokemon.value = null;
  } finally {
    loading.value = false;
  }
};

// Pokémon Image
const pokemonImage = computed(() => {
  if (!pokemon.value) return '';
  const id = pokemon.value.id.toString().padStart(3, '0');
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;
});

// Fetch data on component mount
onMounted(() => {
  fetchPokemonDetails();
});
</script>
