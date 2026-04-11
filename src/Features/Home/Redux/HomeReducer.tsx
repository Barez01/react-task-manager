import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

/* ================= TYPES ================= */

interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
}

interface TaskState {
  tasks: Task[];
  readLoading: boolean;
  writeLoading: boolean;
  updateLoading: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: TaskState = {
  tasks: [],
  readLoading: false,
  writeLoading: false,
  updateLoading: false,
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

export const updateTask = createAsyncThunk<
  number,
  Task,
  { rejectValue: string }
>("task/updateTask", async (taskData, thunkAPI) => {
  try {
    if (!taskData.description) {
      return thunkAPI.rejectWithValue("No description is specified!");
    }

    const accessToken = Cookies.get("access_token");

    const response = await axios.put(
      "http://localhost:5000/tasks",
      {
        id: taskData.id,
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
        state.writeLoading = true;
        state.error = null;
      })
      .addCase(writeTask.fulfilled, (state) => {
        state.writeLoading = false;
      })
      .addCase(writeTask.rejected, (state, action) => {
        state.writeLoading = false;
        state.error = action.payload ?? "Something went wrong";
      })
      .addCase(readTasks.pending, (state) => {
        state.readLoading = true;
        state.error = null;
      })
      .addCase(readTasks.fulfilled, (state, action) => {
        state.readLoading = false;
        state.tasks = action.payload;
      })
      .addCase(readTasks.rejected, (state, action) => {
        state.readLoading = false;
        state.error = action.payload ?? "Something went wrong";
      })
      .addCase(updateTask.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state) => {
        state.updateLoading = false;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export const { setError, clearError } = homeSlice.actions;
export default homeSlice.reducer;
