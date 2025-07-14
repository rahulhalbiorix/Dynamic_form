<template>
  <v-container fluid class="form-wrapper">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12 form-card">
          <v-card-title class="justify-center">
            <h2 class="form-title">📝 Add  Form</h2>
          </v-card-title>

          <v-card-text>
            <v-text-field
              label="Form Name"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-comment-question-outline"
              class="mb-4"
            ></v-text-field>
          </v-card-text>

          <v-card-actions class="d-flex justify-space-between">
            <v-btn
              color="blue-darken-2"
              
              @click="goBack"
              variant="flat"
            >
              ← Back to List
            </v-btn>
            <v-btn
              color="green-darken-1"
              
              @click="addQuestion"
              variant="flat"
            >
              ➕ Add Question
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { router } from '@/Router/router';

const goBack = () => {
  // logic to go back
  router.push({name:'HomePage'})
};

const addQuestion = () => {
  // logic to add question
};
</script>

<style scoped>
.form-wrapper {
  min-height: 100vh;
  padding: 2rem;
}

.form-card {
  border-radius: 20px;
  padding: 1rem;
background: linear-gradient(to right, #e66465, #9198e5);

}

.form-title {
  font-weight: 600;
  font-size: 24px;
  color: #1e88e5;
  margin: 0;
}
</style>
