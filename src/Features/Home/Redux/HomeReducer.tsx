import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

/* ================= TYPES ================= */

interface Task {
  title: string;
  description: string;
}

interface TaskWriteState {
  note: Task | null;
  loading: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: TaskWriteState = {
  note: null,
  loading: false,
  error: null,
};

/* ================= ASYNC ACTION ================= */

export const writeTask = createAsyncThunk<
  Task,
  Task,
  { rejectValue: string }
>("auth/writeTask", async (noteData, thunkAPI) => {
  try {
    const accessToken = Cookies.get("access_token");

    const response = await axios.post("http://localhost:5000/tasks", 
        {
          title: noteData.title,
          description: noteData.description,
        },
        {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Task could not be saved"
    );
  }
});

/* ================= SLICE ================= */

const homeSlice = createSlice({
  name: "auth",
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(writeTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(writeTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(writeTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export default homeSlice.reducer;