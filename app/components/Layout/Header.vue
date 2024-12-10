<template>
  <UHorizontalNavigation 
    :links="navItems"
    class="border-b border-gray-200 dark:border-gray-800" 
  />
</template>

<script setup>

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Rick and Morty", to: "/rickandmorty" },
    { label: "Pokémon", to: "/pokemon"},
  ];

</script>


  