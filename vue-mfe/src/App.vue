<template>
  <div style="padding: 2rem">
    <p class="dev-badge">↳ Vue MFE · Standalone dev mode</p>
    <AboutPage />
  </div>
</template>

<script setup lang="ts">
import AboutPage from './AboutPage.vue'
</script>

<style scoped>
.dev-badge {
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #6b6970;
  margin-bottom: 2rem;
}
</style>
