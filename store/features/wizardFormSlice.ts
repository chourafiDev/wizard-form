import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  currentStep: number;
  formData: Record<string, any>;
  availabilityData: Record<string, any>;
  finalData: Record<string, any>;
}

const initialState: CounterState = {
  currentStep: 1,
  formData: {},
  availabilityData: {},
  finalData: {},
};

export const wizardFormSlice = createSlice({
  name: "wizardForm",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setFormData: (state, action: PayloadAction<Record<string, any>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setAvailabilityData: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.availabilityData = { ...action.payload };
    },
    setMergeData: (state) => {
      state.finalData = {
        ...state.formData,
        availabilityInfo: { ...state.availabilityData },
      };
    },
  },
});

export const {
  setCurrentStep,
  setFormData,
  setAvailabilityData,
  setMergeData,
} = wizardFormSlice.actions;

export default wizardFormSlice.reducer;
