import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

/* ================= TYPES ================= */

interface Task {
  title: string;
  description: string;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

/* ================= ASYNC ACTION ================= */

export const writeTask = createAsyncThunk<
  number,
  Task,
  { rejectValue: string }
>("task/writeTask", async (taskData, thunkAPI) => {
  try {
    if (!taskData.description) {
      return thunkAPI.rejectWithValue("No description is specified!");
    }

    const accessToken = Cookies.get("access_token");

    const response = await axios.post(
      "http://localhost:5000/tasks",
      {
        title: "-",
        description: taskData.description,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.status;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Task could not be saved",
    );
  }
});

export const readTasks = createAsyncThunk<
  Task[],
  void,
  { rejectValue: string }
>("task/readTasks", async (_, thunkAPI) => {
  try {

    const accessToken = Cookies.get("access_token");

    const response = await axios.get(
      "http://localhost:5000/tasks",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data.tasks;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Tasks could not be returned",
    );
  }
});

/* ================= SLICE ================= */

const homeSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
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
      })
      .addCase(readTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(readTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export const { setError, clearError } = homeSlice.actions;
export default homeSlice.reducer;
