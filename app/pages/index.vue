<template>
  <div class="text-center">
    <h2 class="text-4xl font-bold mb-4 mt-4">Welcome to My Nuxt App</h2>
    <p class="mb-6">Explore Rick and Morty characters and Pokémon.</p>
    <div class="flex justify-center space-x-4">
      <nuxt-link to="/rickandmorty" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Rick and Morty</nuxt-link>
      <nuxt-link to="/pokemon" class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">Pokémon</nuxt-link>
    </div>
  </div>
</template>
