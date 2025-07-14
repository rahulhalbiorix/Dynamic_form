<template>
  <v-app class="hero-image">
    <v-main>
      <RouterView ></RouterView>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  //
</script>

<style scoped>
.hero-image {
  background-image: url("./assets/chatgpt-hero-image.png");
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100%;
  overflow-y: hidden;
}
</style>
