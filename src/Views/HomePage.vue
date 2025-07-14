<template>
  <main class="d-flex fill-height">
    <v-container class="pa-0 ma-0" fluid>
      <v-btn
        color="red-lighten-1"
        icon="mdi-plus"
        class="position-absolute bottom-0 right-0 ma-6"
          :to="{ name: 'AddNewForm' }"  
      ></v-btn>
    </v-container>
  </main>
</template>
<script lang="ts" setup>
</script>

<style scoped></style>

