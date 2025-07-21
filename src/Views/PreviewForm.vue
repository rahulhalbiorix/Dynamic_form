<template>
  <v-container class="pa-4" style="max-height: 750px; overflow-y: auto">
    <v-card
      class="pa-6 rounded-xl"
      elevation="10"
      style="
        border: 1px solid #b2dfdb;
        background-color: #ffffff;
        color: #212121;
      "
    >
      <!-- Form Title -->
      <h2
        class="text-h5 font-weight-bold text-center mb-6 py-4 rounded-lg"
        style="
          background-color: #e0f2f1;
          color: #00695c;
          border: 1px solid #b2dfdb;
          letter-spacing: 0.5px;
        "
      >
        {{ form?.formName }} Preview
      </h2>

      <!-- Dynamic Form -->
      <v-form
        ref="formRef"
        style="border-left: 4px solid #80cbc4; padding-left: 8px"
      >
        <v-row dense>
          <!-- Loop through each question -->
          <v-col
            cols="12"
            v-for="(question, index) in form?.questionList"
            :key="index"
          >
            <v-text-field
              v-if="
                ['Text', 'Number', 'textArea', 'date'].includes(question.type)
              "
              v-model="formData[index]"
              :label="`${index + 1}. ${question.question}`"
              :type="
                question.type === 'Number'
                  ? 'number'
                  : question.type === 'date'
                  ? 'date'
                  : 'text'
              "
              :rules="fieldRules[index]"
              color="teal"
              variant="outlined"
              density="comfortable"
              class="mb-4"
            />

            <v-select
              v-else-if="question.type == 'dropDown'"
              v-model="formData[index]"
              :label="`${index + 1}. ${question.question}`"
              :items="question.options"
              clearable
              :rules="fieldRules[index]"
              color="teal"
              variant="outlined"
              density="comfortable"
              class="mb-4"
            />

            <v-radio-group
              v-else-if="question.type === 'radio'"
              v-model="formData[index]"
              :label="`${index + 1}. ${question.question}`"
              :rules="fieldRules[index]"
              color="teal"
              class="pl-2 mb-4"
              density="comfortable"
            >
              <v-radio
                v-for="(opt, i) in question.options"
                :key="i"
                :label="opt"
                :value="opt"
                color="teal"
                class="ml-2"
              />
            </v-radio-group>

            <!-- Checkbox Group -->
            <div v-else-if="question.type === 'checkbox'" class="mb-4">
              <label class="text-subtitle-1 font-weight-medium mb-2 d-block">
                {{ index + 1 }}. {{ question.question }}
              </label>
              <v-row>
                <v-col
                  cols="6"
                  sm="4"
                  md="3"
                  v-for="(opt, i) in question.options"
                  :key="i"
                >
                  <v-checkbox
                    v-model="formData[index]"
                    :label="opt"
                    :value="opt"
                    color="teal"
                    density="comfortable"
                    hide-details
                  />
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>

        <!-- Submit Button -->
        <v-row justify="center" class="mt-6">
          <v-btn
            color="teal-darken-2"
            size="large"
            class="text-white font-weight-bold px-6 py-3"
            @click="submitForm"
            prepend-icon="mdi-check-circle-outline"
            elevation="2"
          >
            Submit
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { useDynamicFormDataStore } from "@/stores/store";
import type { VForm } from "vuetify/components";
import { nextTick } from "vue";

const formRef = ref<VForm | null>(null);

const route = useRoute();

const store = useDynamicFormDataStore();

const form = ref();

const formData = reactive<{ [key: number]: any }>({});

const fieldRules = reactive({});
onMounted(() => {
  const formId = Number(route.params.id);
  form.value = store.formCollection.find((f) => f.id === formId);

  if (form.value) {
    form.value.questionList.forEach((question: any, index: any) => {
      // Initialize formData for each question
      if (question.type === "checkbox") {
        formData[index] = []; // array for checkbox group
      } else {
        formData[index] = ""; // single value for others
      }

      // Generate rules for this question
      const rules: any[] = [];

      if (question.validation.includes("required")) {
        rules.push((v: any) =>
          Array.isArray(v)
            ? v.length > 0 || "This field is required"
            : !!v || "This field is required"
        );
      }

      if (question.validation.includes("minLength")) {
        const min = question.validationOptions.minLength || 0;
        rules.push((v: any) =>
          v === undefined ||
          v === null ||
          typeof v !== "string" ||
          v.length >= min
            ? true
            : `Minimum length is ${min}`
        );
      }

      if (question.validation.includes("maxLength")) {
        const max = question.validationOptions.maxLength || Infinity;
        rules.push(
          (v: any) => !v || v.length <= max || `Maximum length is ${max}`
        );
      }

      fieldRules[index] = rules;
    });
  }
});

async function submitForm() {
  await nextTick();

  const result =await formRef.value?.validate();

  

  if (result?.valid) {
    alert("Form submitted successfully!");
  } else {
    alert("Validation failed ❌");
  }
}

</script>