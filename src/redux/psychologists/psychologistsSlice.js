import { createSlice } from "@reduxjs/toolkit";
import { fetchPsychologistsInfo } from "./operations";
import { logout } from "../auth/operations";

const psychologistsSlice = createSlice({
  name: "psychologists",
  initialState: {
    items: [],
    lastKey: null,
    isLoading: false,
    error: null,
    favorite: [],
  },
  reducers: {
    resetPsychologists: (state) => {
      state.items = [];
      state.lastKey = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPsychologistsInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPsychologistsInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // Get new teachers
        const newPsychologists = action.payload.items;

        // Remove duplicates using a Set (assuming `avatar_url` is unique)
        const existingUrls = new Set(
          state.items.map((psychologist) => psychologist.avatar_url)
        );
        const uniquePsychologist = newPsychologists.filter(
          (psychologist) => !existingUrls.has(psychologist.avatar_url)
        );

        // Append only unique teachers
        state.items = [...state.items, ...uniquePsychologist];

        state.lastKey = action.payload.lastKey;
      })
      .addCase(logout.fulfilled, () => {
        return {
          items: [],
          lastKey: null,
          isLoading: false,
          error: null,
          favorite: [],
        };
      })
      .addCase(fetchPsychologistsInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPsychologists } = psychologistsSlice.actions;
export default psychologistsSlice.reducer;
