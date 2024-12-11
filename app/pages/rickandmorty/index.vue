<template>
  <div>
    <div class="flex justify-between items-center m-4">
      <h1 class="text-2xl font-bold">Rick & Morty Characters</h1>
      <UButton
        :icon="isGridView ? 'i-heroicons-server' : 'i-heroicons-document'"
        color="primary"
        variant="link"
        :label="isGridView ? 'Toggle View: Grid' : 'Toggle View: List'"
        :trailing="true"
        @click="toggleView"
        class="mt-2 mr-2"
      />
    </div>

    <!-- Spinner for Initial Loading -->
    <LoadingSpinner v-if="loading" />

    <!-- Character Grid/List -->
    <div v-else class="flex-grow px-4">
      <div class="h-[70vh] overflow-y-auto">
        <GridView v-if="isGridView" :items="mappedCharacters" />
        <ListView v-else :items="mappedCharacters" />
      </div>

       <!-- Pagination Controls -->
       <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @page-change="onPageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useViewModeStore } from '~/stores/viewMode';
import { useApi } from '~/composables/useApi';
import GridView from '~/components/Views/GridView.vue';
import ListView from '~/components/Views/ListView.vue';
import Pagination from '~/components/Navigation/Pagination.vue';
import LoadingSpinner from '~/components/Utilities/LoadingSpinner.vue';

// State for loading, pagination, and fetched characters
const loading = ref(true); // Initial loading state
const characters = ref([]); // Store fetched characters
const currentPage = ref(1); // Current page for pagination
const itemsPerPage = 20; // Number of items per page
const totalPages = ref(0); // Total pages, updated after fetch
const router = useRouter();
const route = useRoute();

// View Mode Store (Grid or List view)
const viewModeStore = useViewModeStore();
const isGridView = computed(() => viewModeStore.isGridView);
const toggleView = viewModeStore.toggleView;

// Fetch data from API
const { fetchData } = useApi('https://rickandmortyapi.com/api/');

const fetchCharacters = async () => {
  loading.value = true;

  try {
    console.log('Fetching data for page:', currentPage.value);
    const response = await fetchData(`character?page=${currentPage.value}`);
    console.log("API Response:", response); // Log the full API response

    if (response?.results) {
      characters.value = response.results; // Replace characters with new page data
      totalPages.value = response.info.pages; // Calculate total pages
      console.log("Characters after fetch:", characters.value); // Log the updated characters
    }
  } catch (error) {
    console.error('Error fetching characters:', error);
  } finally {
    loading.value = false; // Stop the initial loading spinner
  }
};

// Map characters for grid or list display
const mappedCharacters = computed(() => {
  return characters.value.map((character) => ({
    id: character.id,
    title: character.name,
    image: character.image,
    link: {
      path: `/rickandmorty/${character.id}`,
      query: { page: currentPage.value }, // Pass current page in query
    },
    description: character.species,
  }));
});

// Handle pagination change
const onPageChange = (newPage) => {
  console.log('New Page Selected:', newPage);
  currentPage.value = newPage; // Update the current page
  router.replace({ query: { page: newPage } });
  fetchCharacters(); // Fetch data for the new page
};

onMounted(() => {
  if (!viewModeStore.isGridView) {
    viewModeStore.isGridView = true; // Force Grid View as default
  }
  const pageFromQuery = parseInt(route.query.page, 10);
  if (pageFromQuery && pageFromQuery !== currentPage.value) {
    currentPage.value = pageFromQuery;
  }
  fetchCharacters(); // Fetch data for page 1
});

</script>
