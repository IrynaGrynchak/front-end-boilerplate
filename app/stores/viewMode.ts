import { defineStore } from 'pinia';

export const useViewModeStore = defineStore('viewMode', {
  state: () => ({
    isGridView: true, // Default to grid view
  }),
  actions: {
    toggleView() {
      this.isGridView = !this.isGridView;
    },
  },
});
