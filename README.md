# Assignment: Rick & Morty and Pokémon Overview Application

## Live Application

You can view the deployed application here: 
[Rick & Morty and Pokémon App](https://rickandmortypluspokemon.netlify.app/rickandmorty)

_Note: As I don't have admin rights for this repository, the live URL has been added here instead of in the repository settings._

## Features

1. **Grid and List View Toggle:**
   - Users can seamlessly switch between a grid and list layout for browsing characters and Pokémon.

2. **Pokémon Infinite Scrolling:**
   - The Pokémon page dynamically loads additional content as the user scrolls.

3. **Rick & Morty Pagination:**
   - The Rick & Morty page implements pagination for better control of data navigation.

4. **Detailed Views:**
   - Clicking on a character or Pokémon redirects users to a detailed view with additional information.

5. **Reusable Components:**
   - Components like cards, buttons, and loading spinners were designed for maximum reusability and scalability.

## Implementation Details

### Technologies Used
   - **Vue.js 3:** To build the user interface with reactivity and a component-based architecture.
   - **Nuxt UI:** For pre-built components and utilities.
   - **Tailwind CSS:** For responsive and modern UI styling.
   - **Pinia:** For state management, particularly for toggling views and managing global data.
   - **PokéAPI & Rick and Morty API:** To fetch data dynamically and display the characters and Pokémon.

### Testing
   - A few unit tests were implemented to ensure components and functionality behave as expected.


## Getting Started

### Run the Project

```bash
pnpm i
pnpm run dev
```
