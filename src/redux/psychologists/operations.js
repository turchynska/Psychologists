import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../database/firebaseConfig.js";

axios.defaults.baseURL =
  "https://psychologists-81420-default-rtdb.firebaseio.com/";

export const fetchPsychologistsInfo = createAsyncThunk(
  "psychologists/fetchAll",
  async ({ limit = 3, startKey = null }, thunkAPI) => {
    try {
      const user = auth.currentUser;
      const token = user ? await user.getIdToken() : null;

      const params = {
        limitToFirst: limit + 1, // беремо на 1 більше, щоб зрозуміти, чи є ще
        orderBy: '"$key"',
        ...(startKey && { startAt: `"${startKey}"` }),
        ...(token && { auth: token }),
      };

      const response = await axios.get("/.json", { params });

      if (!response.data) return { items: [], lastKey: null };

      const psychologists = response.data;
      const keys = Object.keys(psychologists);

      if (startKey) keys.shift(); // Видаляємо дубль startKey

      const hasMore = keys.length > limit;
      const filteredKeys = keys.slice(0, limit); // Тільки потрібна кількість

      const filteredItems = filteredKeys
        .map((key) => ({ ...psychologists[key], _key: key }))
        .filter((item) => item !== null);

      const lastKey = hasMore ? keys[limit] : null;

      return { items: filteredItems, lastKey };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
