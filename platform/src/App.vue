<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue';
</script>

<template>
  <div class="app-container flex flex-col items-center">
    <router-view />
  </div>
  <Toaster/>
</template>

<style scoped>
/* .app-container {
  width: 100%;
} */
</style>