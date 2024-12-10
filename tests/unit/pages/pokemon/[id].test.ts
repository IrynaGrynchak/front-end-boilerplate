import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { useRoute } from 'vue-router';
import PokemonDetails from '~/pages/pokemon/[id].vue';
import LoadingSpinner from '~/components/Utilities/LoadingSpinner.vue';
import { useApi } from '~/composables/useApi';

// Mock the `useApi` and `useRoute` composables
vi.mock('~/composables/useApi');
vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
}));

describe('[id].vue', () => {
  const fetchData = vi.fn();
  const mockRoute = {
    params: { id: '1' },
    name: 'pokemon-details',
    path: '/pokemon/1',
    fullPath: '/pokemon/1',
    query: {},
    hash: '',
    matched: [],
    redirectedFrom: undefined,
    meta: {},
  };

  beforeEach(() => {
    // Mock the composables
    vi.mocked(useApi).mockReturnValue({ fetchData });
    vi.mocked(useRoute).mockReturnValue(mockRoute);
  });

  it('renders the loading spinner when loading is true', () => {
    const wrapper = mount(PokemonDetails, {
      global: {
        components: { LoadingSpinner },
      },
      data() {
        return { loading: true, pokemon: null };
      },
    });

    expect(wrapper.findComponent(LoadingSpinner).exists()).toBe(true);
  });

  it('renders Pokémon details when data is successfully fetched', async () => {
    fetchData.mockResolvedValueOnce({
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
    });

    const wrapper = mount(PokemonDetails);

     // Wait for all async operations to complete
    await flushPromises();

    expect(fetchData).toHaveBeenCalledWith('pokemon/1');
    expect(wrapper.find('h1').text()).toBe('bulbasaur');
    expect(wrapper.text()).toContain('Height: 0.7 m');
    expect(wrapper.text()).toContain('Weight: 6.9 kg');
    expect(wrapper.text()).toContain('grass');
    expect(wrapper.text()).toContain('poison');
  });

  it('shows an error message when data fails to load', async () => {
    // Mock `fetchData` to simulate an error
    fetchData.mockRejectedValueOnce(new Error('Network Error'));
  
    const wrapper = mount(PokemonDetails);
  
    // Wait for the component to update
    await flushPromises();
  
    // Log the rendered HTML for debugging
    console.log(wrapper.html());
  
    // Verify that the error message is displayed
    const errorMessage = wrapper.find('.text-red-500');
    expect(errorMessage.exists()).toBe(true); // Ensure the error message is rendered
    expect(errorMessage.text()).toContain('Failed to load Pokémon details');
  });
  
});
