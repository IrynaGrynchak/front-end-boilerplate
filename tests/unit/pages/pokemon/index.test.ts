import { describe, it, expect, vi, afterEach } from 'vitest';
import { useApi } from '~/composables/useApi';

describe('useApi', () => {
  const baseUrl = 'https://pokeapi.co/api/v2/'; // Base URL for the API
  const { fetchData } = useApi(baseUrl);

  afterEach(() => {
    vi.restoreAllMocks(); // Restore fetch mocks after each test
  });

  it('should fetch data successfully', async () => {
    const mockResponse = {
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      ],
    };

    // Mock `fetch` to return a successful response
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const data = await fetchData('pokemon?limit=2');
    expect(global.fetch).toHaveBeenCalledWith(`${baseUrl}pokemon?limit=2`);
    expect(data).toEqual(mockResponse);
  });

  it('should handle API errors', async () => {
    // Mock `fetch` to simulate an error response
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    } as Response);

    const data = await fetchData('pokemon/9999');
    expect(global.fetch).toHaveBeenCalledWith(`${baseUrl}pokemon/9999`);
    expect(data).toBeNull(); // Expect null on error
  });

  it('should handle network errors', async () => {
    // Mock `fetch` to simulate a network error
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network Error'));

    const data = await fetchData('pokemon');
    expect(global.fetch).toHaveBeenCalledWith(`${baseUrl}pokemon`);
    expect(data).toBeNull(); // Expect null on network error
  });
});
