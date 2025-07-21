<template>
  <main class="d-flex fill-height"  style="overflow-y: auto; max-height: 100vh;">
    <v-container  fluid  class="pa-6 ma-0"  >
        
      <v-row dense>
        <v-col
          v-for="(form, index) in forms"
          :key="form.id"
          cols="12"
          md="6"
          lg="4"
        >
          <v-card class="pa-4" elevation="8" color="indigo-lighten-5">
            <div class="d-flex justify-space-between align-center mb-2">
              <h3 class="text-h6 font-weight-medium">
                {{ index + 1 }}. {{ form.formName }}
              </h3>
              <v-chip color="deep-purple-lighten-2" size="small" class="text-caption">
                {{ form.questionList.length }} Questions
              </v-chip>
            </div>

            <div class="d-flex justify-end gap-2">
              <v-btn
                icon
                variant="outlined"
                color="primary"
                @click="editForm(form.id)"
                >
                
                <v-icon>mdi-pencil</v-icon>
              </v-btn>

              <v-btn
                icon
                variant="outlined"
                color="warning"
                class="mx-2"
                @click="previewForm(form.id)"
                >
               
                <v-icon>mdi-eye</v-icon>
              </v-btn>

              <v-btn
                icon
                variant="outlined"
                color="red"
                @click="deleteForm(form.id)"
                >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-btn
      size="x-large"
        color="red-lighten-1"
        icon="mdi-plus"
        class="floating-btn position-absolute bottom-0 right-0 ma-8"
          :to="{ name: 'AddNewForm' }"  
      ></v-btn>
    </v-container>
  </main>
</template>
<script lang="ts" setup>
import { useDynamicFormDataStore } from "@/stores/store";
import PreviewForm from "./PreviewForm.vue";
import {router} from '@/Router/router'


const store = useDynamicFormDataStore();


const forms = store.formCollection


function previewForm(formId:number){
     
      router.push({name:'PreviewForm' , params:{id:formId}})


}

function deleteForm(formId:number){
    
      store.deleteForm(formId)
}


function editForm(formId: number) {
  store.loadFormToEdit(formId); 
  
  router.push({ name: "AddNewForm" }); // reuse same route
}




</script>

<style scoped>

@keyframes float {
  0% {
    transform: translateY(0px);
    box-shadow: 10px;
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}


.floating-btn{
  animation:float 2s ease-in-out infinite;
  box-shadow: 0 2px 25px 10px #B4EBE6;
}

</style>

