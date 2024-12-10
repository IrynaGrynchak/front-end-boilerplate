export const useApi = (baseUrl: string) => {
  const fetchData = async (endpoint: any) => {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`);
      console.log('Fetching URL:', `${baseUrl}${endpoint}`); // Debug: log the full URL
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      return await response.json(); // Return the parsed JSON
    } catch (error) {
      console.error('Fetch error:', error); // Log errors for debugging
      return null; // Return null if the fetch fails
    }
  };

  return { fetchData };
};
