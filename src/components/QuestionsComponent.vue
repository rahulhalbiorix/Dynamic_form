<template>
  <v-container  class="d-flex" fluid>
    <!-- {{ store.formDetails.questionList }} -->
    <v-container>
      <!-- {{ activeValidationFields }} -->
      <v-card
        title="Add Questions"
        variant="tonal"
        class="mr-1 text-center pa-2"
        style="border: 2px solid white"
      >
        <v-row>
          <!-- column for question text field -->
          <v-col cols="12" md="4">
            <v-text-field
              label="Question"
              v-model="form.question"
              :rules="questionNameRules"
            />
          </v-col>
          <!-- column for type field dropdown list -->
          <v-col cols="12" md="4">
            <v-select
              label="Type"
              :items="types"
              v-model="form.type"
              :rules="typeSelectionRules"
            />
          </v-col>
          <!-- column for validation field dropdown list -->
          <v-col cols="12" md="4">
            <v-autocomplete
              label="Validation"
              v-model="form.validation"
              :items="['required', 'minLength', 'maxLength']"
              multiple
              chips
              :rules="validationSelectionRules"
            />
          </v-col>
          <!-- column for validation option form filed   -->
          <v-col
            cols="12"
            v-if="['Text', 'Number', 'textArea'].includes(form.type)"
            
          >
            <v-row v-for="rule in activeValidationFields" :key="rule">
              <v-col cols="12">
                <v-text-field
                  v-if="rule === 'minLength'"
                  v-model="form.validationOptions.minLength"
                  label="Minimum Length"
                  type="number"
                  min="1"
                />
                <v-text-field
                  v-else-if="rule === 'maxLength'"
                  v-model="form.validationOptions.maxLength"
                  label="Maximum Length"
                  type="number"
                  min="1"
                />
              </v-col>
            </v-row>
          </v-col>

          <!-- column for input type option form field  -->
          <v-col
            cols="12"
            v-if="['checkbox', 'radio', 'dropDown'].includes(form.type)"
          >
            <v-card class="pa-4 bg-blue-lighten-5">
              <!-- {{ form.options }} -->
              <h3 class="text-md mb-2 text-indigo-darken-2">
                Add Options for {{ form.type }}
              </h3>
              <v-row
                v-for="(opt, idx) in form.options"
                :key="idx"
                align="center"
                
              >
                <v-col cols="10">
                  <v-text-field
                    v-model="form.options[idx]"
                    :label="`Option ${idx + 1}`"
                    dense
                  />
                </v-col>
                <v-col cols="2" class="text-right">
                  <v-btn icon @click="removeOption(idx)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-btn
                class="mt-2"
                color="indigo"
                variant="outlined"
                prepend-icon="mdi-plus"
                @click="addOption"
              >
                Add More Option
              </v-btn>
            </v-card>
          </v-col>
        </v-row>

        <v-card-actions class="justify-center">
          <v-btn
            prepend-icon="mdi-plus"
            variant="outlined"
            color="black"
            @click="addQuestion"
            >Add Question to a form</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-container>
    <v-container>
      <!-- {{ store.formDetails.questionList }} -->
      <v-card
        variant="tonal"
        style="
          border: 2px solid white;
          min-height: 200px;
          max-height: 600px;
          overflow-y: scroll;
        "
        class="pa-4"
      >
        <v-row
          v-for="(que, index) in store.formDetails.questionList"
          :key="index"
        >
          <v-col cols="12">
            <v-card
              variant="elevated"
              class="pa-4 rounded-xl hover-card"
              color="indigo-lighten-5"
              style="transition: 0.3s ease, box-shadow 0.3s ease"
            >
              <div class="d-flex justify-space-between align-center">
                <div class="text-left">
                  <h3
                    class="text-lg font-weight-medium mb-1 text-indigo-darken-2"
                  >
                    {{ index + 1 }}. {{ que.question }}
                  </h3>
                  <p class="text-sm text-grey-darken-1">
                    Type:
                    <strong class="text-indigo-darken-2">{{ que.type }}</strong>
                    | Validations:
                    <span v-for="(val, i) in que.validation" :key="i">
                      <v-chip
                        size="x-small"
                        color="deep-purple-lighten-3"
                        class="ma-1 text-caption font-weight-medium dark-chip-text"
                      >
                        {{ val }}
                      </v-chip>
                    </span>
                  </p>
                </div>

                <div>
                  <v-btn
                    icon
                    variant="outlined"
                    class="mr-2"
                    color="indigo"
                    style="border-width: 2px"
                    @click="editQuestion(index)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>

                  <v-btn
                    icon
                    variant="outlined"
                    color="red-darken-1"
                    style="border-width: 2px"
                    @click="deleteQuestion(index)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-row
          justify="center"
          v-if="store.formDetails.questionList.length > 0"
        >
          <v-btn
            variant="outlined"
            color="white"
            prepend-icon="mdi-plus"
            class="bg-indigo lighten-2 mb-2"
            @click="createForm"
          >
            Create Form
          </v-btn>
        </v-row>
        <template v-if="store.formDetails.questionList.length === 0">
          <h1 class="text-center text-h6 mt-4">No Question Available!</h1>
        </template>
      </v-card>
    </v-container>
  </v-container>
  <v-container class="pa-0 ma-0">
    <v-btn
      size="x-large"
      color="red-lighten-1"
      icon="mdi-home"
      class="floating-btn position-absolute bottom-0 right-0 ma-8"
      :to="{ name: 'HomePage' }"
    ></v-btn>
    <div style="background-color: hotpink"></div>
  </v-container>
  <v-snackbar
    v-model="showSnackbar"
    :color="snackbarColor"
    timeout="1000"
    location="top right"
  >
    {{ snackbarMessage }}
  </v-snackbar>
  <!-- {{ store.formCollection }} -->
</template>

<script lang="ts" setup>
import useVuelidate from "@vuelidate/core";
import { computed, reactive, ref, watch } from "vue";
import { required } from "@vuelidate/validators";
import { useDynamicFormDataStore } from "@/stores/store";
import { router } from "@/Router/router";

const form = reactive({
  question: "",
  type: "",
  validation: [] as string[],
  validationOptions: {
    minLength: null as number | null,
    maxLength: null as number | null,
  },
  options: [] as string[],
});

const showSnackbar = ref(false);
const snackbarMessage = ref("");
const snackbarColor = ref("error"); //  "success", "info", "warning"

const questionNameRules = [
  (value: string) => {
    if (value) return true;
    return "please Enter Question Name";
  },
];

const typeSelectionRules = [
  (value: string) => {
    if (value) return true;
    return "please select  type of the question";
  },
];

const validationSelectionRules = [
  (value: string[]) => {
    if (Array.isArray(value) && value.length > 0) return true;
    return "Please add at least one validation rule";
  },
];

const types = [
  "Text",
  "Number",
  "textArea",
  "date",
  "dropDown",
  "radio",
  "checkbox",
];

const validationMenu = ref(false);

const store = useDynamicFormDataStore();

watch(
  () => form.type,
  (newType) => {
    if (isEditing.value) return;

    if (["checkbox", "radio", "dropDown"].includes(newType)) {
      form.options = [" "];
    } else {
      form.options = [];
    }
  }
);

const activeValidationFields = computed(() => {
  return form.validation.filter((e) => ["minLength", "maxLength"].includes(e));
});

function addOption() {
  form.options.push("");
}

function removeOption(index: number) {
  form.options.splice(index, 1);
}


const currentEditIndex = ref<number | null>(null);



function addQuestion() {

  const isQuestionValid = questionNameRules.every(
    (rule) => rule(form.question) === true
  );
  const isTypeValid = typeSelectionRules.every(
    (rule) => rule(form.type) === true
  );
  const isValidationValid = validationSelectionRules.every(
    (rule) => rule(form.validation) === true
  );



  if (!isQuestionValid || !isTypeValid || !isValidationValid) {
    snackbarMessage.value = "Please fill all required fields correctly.";
    snackbarColor.value = "error";
    showSnackbar.value = true;
    return;
  }


const newQuestion = {...form}


   if(isEditing.value &&  currentEditIndex.value !== null  ){
         store.formDetails.questionList[currentEditIndex.value] = newQuestion

   }
   else{
     store.addQuestionIntoQuestionList(newQuestion);
     snackbarMessage.value = "Question added successfully!";
   }


  snackbarColor.value = "success";
  showSnackbar.value = true;
  resetForm()
}

function resetForm() {
  form.question = "";
  form.type = "";
  form.validation = [];
  form.validationOptions.minLength = null;
  form.validationOptions.maxLength = null;
  form.options = [];
  isEditing.value = false;
  currentEditIndex.value = null;
}



const isEditing = ref(false);

const editQuestion = (index: number) => {
  isEditing.value = true;
  currentEditIndex.value = index;
  const q = store.formDetails.questionList[index];

  form.question = q.question;
  form.type = q.type;
  form.validation = [...(q.validation || [])];
  form.options = q.options ? [...q.options] : [];
  form.validationOptions.minLength = q.validationOptions?.minLength ?? null;
  form.validationOptions.maxLength = q.validationOptions?.maxLength ?? null;

  // Show feedback or focus if needed
  snackbarMessage.value = `Editing question ${index + 1}`;
  snackbarColor.value = "info";
  showSnackbar.value = true;
};

const deleteQuestion = (index: number) => {
  store.formDetails.questionList.splice(index, 1);
};


const createForm = () => {
  store.createForm({ ...store.formDetails });
  router.push({ name: "HomePage" }); // navigate after saving
};


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

.floating-btn {
  animation: float 2s ease-in-out infinite;
  box-shadow: 0 2px 25px 10px #b4ebe6;
}

.hover-card:hover {
  box-shadow: 0 4px 20px rgba(60, 60, 93, 0.2);
  transform: translateY(-2px);
}

.dark-chip-text {
  color: #2e0e5f !important; /* any dark color */
}
</style>
