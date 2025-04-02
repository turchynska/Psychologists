import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL =
  "https://psychologists-81420-default-rtdb.firebaseio.com";

export const fetchPsychologistsInfo = createAsyncThunk(
  "psychologists/fetchAll",
  async ({ limit = 4, startKey = null }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token; // Якщо використовуєш аутентифікацію

      let url = `/.json?orderBy="id"&limitToFirst=${limit + 1}`;
      if (startKey) {
        url += `&startAt="${startKey}"`;
      }
      if (token) {
        url += `&auth=${token}`;
      }

      const response = await axios.get(url);
      if (!response.data) return { items: [], lastKey: null };

      const psychologists = response.data;
      const filteredKeys = Object.keys(psychologists);
      if (startKey && filteredKeys[0] === startKey) {
        filteredKeys.shift();
      }

      const filteredItems = filteredKeys
        .map((key) => psychologists[key])
        .filter((t) => t !== null);

      const lastKey =
        filteredKeys.length > 0 ? filteredKeys[filteredKeys.length - 1] : null;
      if (filteredItems.length === 0) {
        return { items: [], lastKey: null };
      }

      return { items: filteredItems, lastKey };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);