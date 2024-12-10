<template>
    <div>
      <div class="flex justify-between items-center m-4">
        <h1 class="text-2xl font-bold">Pokémon</h1>
        <UButton
          :icon="isGridView ? 'i-heroicons-server' : 'i-heroicons-document'"
          variant="link"
          color="primary"
          :label="isGridView ? 'Toggle View: Grid' : 'Toggle View: List'"
          :trailing="true"
          @click="toggleView"
          class="mt-2 mr-2"
        />
      </div>
  
      <!-- Scrollable Container for Grid/List -->
      <div
        ref="scrollContainer"
        class="flex-grow overflow-y-auto h-[80vh]"
        @scroll.passive="onScroll"
      >
        <div v-if="!loading" class="flex-grow px-4">
            <!-- Show Grid or List View -->
            <GridView v-if="isGridView" :items="mappedPokemons" />
            <ListView v-else :items="mappedPokemons" />
        </div>
  
        <!-- Spinner for Loading More Pokémon -->
        <LoadingSpinner v-if="loading" />

      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useViewModeStore } from '~/stores/viewMode';
  import { useApi } from '~/composables/useApi';
  import GridView from '~/components/Views/GridView.vue';
  import ListView from '~/components/Views/ListView.vue';
  import LoadingSpinner from '~/components/Utilities/LoadingSpinner.vue';
  
  const { fetchData } = useApi('https://pokeapi.co/api/v2/');
  const pokemons = ref([]); // Store all fetched Pokémon
  const offset = ref(0); // Offset for pagination
  const limit = 20; // Number of Pokémon to fetch per request
  const loading = ref(false);
  const scrollContainer = ref(null);

  // View Mode (Grid/List view)
  const viewModeStore = useViewModeStore();
  const isGridView = computed(() => viewModeStore.isGridView);
  const toggleView = viewModeStore.toggleView;
  
  // Fetch Pokémon data
  const fetchPokemons = async () => {
    if (loading.value) return;
    loading.value = true;
    try {
      const response = await fetchData(`pokemon?limit=${limit}&offset=${offset.value}`);
      console.log('API Response:', response); // Debug log
      if (response?.results) {
        // Log the new data being added
        pokemons.value.push(...response.results); // Add new Pokémon to the list
        offset.value += limit; // Update offset for pagination
      }
    } catch (error) {
      console.error('Error fetching Pokémon:', error); 
    } finally {
      loading.value = false;
    }
  };
  
  // Handle scroll event to load more Pokémon
  const onScroll = () => {
    console.log('Scrolling...');
    const container = scrollContainer.value;
    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
      fetchPokemons();
    }
  };
  
  // Map Pokémon for GridView and ListView
  const mappedPokemons = computed(() => {
    const result = pokemons.value.map((pokemon) => {
      const id = pokemon.url.split('/').filter(Boolean).pop();
        return {
          title: pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          link: `/pokemon/${id}`,
          id: id,
          };
      });
    return [...result]; 
  });

  onMounted(() => {
    if (!viewModeStore.isGridView) {
      viewModeStore.isGridView = true; // Force Grid View as default
    }
    fetchPokemons();
  });

  </script>