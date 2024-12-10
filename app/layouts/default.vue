<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow bg-gray-50">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '~/components/Layout/Header.vue';
import Footer from '~/components/Layout/Footer.vue';
</script>
