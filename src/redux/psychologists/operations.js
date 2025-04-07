
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../database/firebaseConfig.js"; 

axios.defaults.baseURL =
  "https://psychologists-81420-default-rtdb.firebaseio.com/";

export const fetchPsychologistsInfo = createAsyncThunk(
  "psychologists/fetchAll",
  async ({ limit = 4, startKey = null }, thunkAPI) => {
    try {
      const user = auth.currentUser;
      const token = user ? await user.getIdToken() : null;

      const params = {
        orderBy: '"id"',
        limitToFirst: limit + 1,
        ...(startKey && { startAt: `"${startKey}"` }),
        ...(token && { auth: token }),
      };

      const response = await axios.get("/.json", { params });

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

      return { items: filteredItems, lastKey };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
