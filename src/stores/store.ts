import { ref, computed } from "vue";
import { defineStore } from "pinia";

interface QuestionItem {
  question: string;
  type: string;
  validation: string[];
  validationOptions: {
    minLength: number | null;
    maxLength: number | null;
  };
  options: string[];
}

interface formDetails {
  id: number;
  formName: string;
  questionList: QuestionItem[];
}

export const useDynamicFormDataStore = defineStore("dynamicFormData", () => {
  const formCollection = ref([
    {
      id: 1752838764484,
      formName: "User Registration",
      questionList: [
        {
          question: "What is your full name?",
          type: "Text",
          validation: ["required"],
          validationOptions: { minLength: null, maxLength: null },
          options: [],
        },
        {
          question: "Enter your age",
          type: "Number",
          validation: ["minLength"],
          validationOptions: { minLength: 2, maxLength: null },
          options: [],
        },
        {
          question: "Write a short bio",
          type: "textArea",
          validation: ["maxLength"],
          validationOptions: { minLength: null, maxLength: 100 },
          options: [],
        },
        {
          question: "Date of Birth",
          type: "date",
          validation: ["required"],
          validationOptions: { minLength: null, maxLength: null },
          options: [],
        },
        {
          question: "Select your country",
          type: "dropDown",
          validation: ["required"],
          validationOptions: { minLength: null, maxLength: null },
          options: ["USA", "Canada", "India"],
        },
      ],
    },
    {
      id: 1752838820476,
      formName: "College Admission",
      questionList: [
        {
          question: "Choose your stream",
          type: "radio",
          validation: ["required"],
          validationOptions: { minLength: null, maxLength: null },
          options: ["Science", "Commerce", "Arts"],
        },
      ],
    },
    {
      id: 1752838870001,
      formName: "Event Feedback",
      questionList: [
        {
          question: "Rate the event quality",
          type: "dropDown",
          validation: [],
          validationOptions: {},
          options: ["Excellent", "Good", "Average", "Poor"],
        },
        {
          question: "Your suggestions",
          type: "textArea",
          validation: [],
          validationOptions: {},
          options: [],
        },
      ],
    },
    {
      id: 1752838870002,
      formName: "Job Application",
      questionList: [
        {
          question: "Full Name",
          type: "Text",
          validation: ["required"],
          validationOptions: {},
          options: [],
        },
        {
          question: "Years of Experience",
          type: "Number",
          validation: [],
          validationOptions: {},
          options: [],
        },
        {
          question: "Available Start Date",
          type: "date",
          validation: ["required"],
          validationOptions: {},
          options: [],
        },
      ],
    },
    {
      id: 1752838870003,
      formName: "Medical History",
      questionList: [
        {
          question: "Do you have any allergies?",
          type: "radio",
          validation: [],
          validationOptions: {},
          options: ["Yes", "No"],
        },
        {
          question: "List known allergies",
          type: "textArea",
          validation: ["maxLength"],
          validationOptions: { minLength: null, maxLength: 200 },
          options: [],
        },
      ],
    },
    {
      id: 1752838870004,
      formName: "Travel Survey",
      questionList: [
        {
          question: "Preferred travel destination",
          type: "dropDown",
          validation: ["required"],
          validationOptions: {},
          options: ["Europe", "Asia", "America", "Africa"],
        },
        {
          question: "Travel frequency per year",
          type: "Number",
          validation: [],
          validationOptions: {},
          options: [],
        },
      ],
    },
    {
      id: 1752838870005,
      formName: "Tech Conference Signup",
      questionList: [
        {
          question: "Full Name",
          type: "Text",
          validation: ["required"],
          validationOptions: {},
          options: [],
        },
        {
          question: "Email Address",
          type: "Text",
          validation: ["required"],
          validationOptions: {},
          options: [],
        },
        {
          question: "Select your interests",
          type: "checkbox",
          validation: [],
          validationOptions: {},
          options: ["AI", "Cloud", "Cybersecurity", "IoT"],
        },
      ],
    },
    {
      id: 1752838870006,
      formName: "Library Membership",
      questionList: [
        {
          question: "Member Name",
          type: "Text",
          validation: [],
          validationOptions: {},
          options: [],
        },
        {
          question: "Membership Type",
          type: "dropDown",
          validation: [],
          validationOptions: {},
          options: ["Regular", "Student", "Premium"],
        },
      ],
    },
    {
      id: 1752838870007,
      formName: "Customer Support Ticket",
      questionList: [
        {
          question: "Issue Type",
          type: "dropDown",
          validation: ["required"],
          validationOptions: {},
          options: ["Technical", "Billing", "General Inquiry"],
        },
        {
          question: "Describe the issue",
          type: "textArea",
          validation: ["maxLength"],
          validationOptions: { minLength: null, maxLength: "250" },
          options: [],
        },
      ],
    },
    {
      id: 1752838870008,
      formName: "Employee Onboarding",
      questionList: [
        {
          question: "Full Name",
          type: "Text",
          validation: ["required"],
          validationOptions: {},
          options: [],
        },
        {
          question: "Position",
          type: "Text",
          validation: [],
          validationOptions: {},
          options: [],
        },
        {
          question: "Start Date",
          type: "date",
          validation: ["required"],
          validationOptions: {},
          options: [],
        },
      ],
    },
  ]);

  const formDetails = ref<formDetails>({
    id: 0,
    formName: "RegistrationForm",
    questionList: [
 
    ],
  });

  function addQuestionIntoQuestionList(payload: QuestionItem) {
    
      const questionClone =  JSON.parse(JSON.stringify(payload)); 
  formDetails.value.questionList.push(questionClone);
  }



  function createForm(payload: any) {
    const index = formCollection.value.findIndex((f) => f.id === payload.id);

    if (index !== -1) {
      // UPDATE
      formCollection.value[index] = { ...payload };
    } else {
      // CREATE
      formCollection.value.push({
        ...payload,
        id: Date.now(), // only generate ID for new form
      });
    }

    // Reset
    formDetails.value = JSON.parse(JSON.stringify({
  id: 0,
  formName: "RegistrationForm",
  questionList: [],
}));

  }

  function deleteForm(payload: number) {
    

    const findIndex = formCollection.value.findIndex(
      (obj) => obj.id == payload
    );
  
    if (findIndex !== -1) {
      formCollection.value.splice(findIndex, 1);
    }
  }

function loadFormToEdit(formId: number) {
  const form = formCollection.value.find((f) => f.id === formId);

  if (form) {
    formDetails.value = {
      id: form.id,
      formName: form.formName,
      questionList: JSON.parse(JSON.stringify(form.questionList)),
    };
  }
}


  function updateForm(updatedForm: any) {
    
    const index = formCollection.value.findIndex(
      (f) => f.id === updatedForm.id
    );
    
    if (index !== -1) {
      formCollection.value[index] = { ...updatedForm };
    }
  }

  return {
    formCollection,
    formDetails,
    addQuestionIntoQuestionList,
    createForm,
    deleteForm,
    loadFormToEdit,
    updateForm,
  };
});
