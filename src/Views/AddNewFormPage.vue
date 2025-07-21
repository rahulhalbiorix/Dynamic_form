<template>
  <div>
    <v-card
      v-if="showAddForm"
      title="Add Form"
      variant="tonal"
      class="ma-5 pa-3 border-2 black"
      style="border-color: #7c4585; border-width: 2px"
      color="white"
    >
      <v-text-field label="Form Name" v-model="store.formDetails.formName"   :rules="rules"></v-text-field>
      <v-card-actions>
        <v-btn prepend-icon="mdi-arrow-left" variant="outlined" @click="goBack"
          >Back to List</v-btn
        >
        <v-btn
          prepend-icon="mdi-plus"
          variant="outlined"
          color="primary"
          @click="addQuestion"
          >Add Questions</v-btn
        >
      </v-card-actions>
    </v-card>
    <QuestionsComponent v-else></QuestionsComponent>
    
  </div>
</template>

<script lang="ts" setup>
import { router } from "@/Router/router";
import { ref } from "vue";
import QuestionsComponent from "@/components/QuestionsComponent.vue";
import {useDynamicFormDataStore} from '@/stores/store'

const showAddForm = ref(true);

const goBack = () => {
  router.push({ name: "HomePage" });
};

const addQuestion = () => {
  showAddForm.value = false;
};

const rules = [
  (value:any) => {
    if (value) return true;
    return "You must enter a first name.";
  },
];

const store = useDynamicFormDataStore()

</script>

<style scoped>
::v-deep(.v-messages__message) {
  color: red !important;
  font-weight: 500;
}

::v-deep(.v-input.v-input--error .v-label) {
  color: red !important;
  font-weight: 500;
}
</style>
