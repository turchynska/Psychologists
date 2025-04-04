import { createSlice } from "@reduxjs/toolkit";
import { fetchPsychologistsInfo } from "../psychologists/operations.js";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favoriteItems: JSON.parse(localStorage.getItem("favorites")) || [],
  },
  reducers: {
    toggleFavorite(state, action) {
      const psychologist = action.payload;
      const exists = state.favoriteItems.some(
        (item) => item.avatar_url === psychologist.avatar_url
      );

      if (exists) {
        state.favoriteItems = state.favoriteItems.filter(
          (item) => item.avatar_url !== psychologist.avatar_url
        );
      } else {
        state.favoriteItems = [...state.favoriteItems, psychologist];
      }
      localStorage.setItem("favorites", JSON.stringify(state.favoriteItems));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPsychologistsInfo.fulfilled, (state) => {
      state.favoriteItems = state.favoriteItems || [];
    });
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
