import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (email) => {
    const userRes = await axios.get(`http://localhost:3000/users/${email}`);
    const userId = userRes.data.id;
    const taskRes = await axios.get(`http://localhost:3000/tasks/${userId}`);
    return taskRes.data;
  }
);

export const addTaskAsync = createAsyncThunk(
  "tasks/addTaskAsync",
  async (taskData) => {
    const res = await axios.post("http://localhost:3000/tasks", taskData);
    return res.data;
  }
);

const TicketSlice = createSlice({
  name: "Tickets",
  initialState: {
    tasks: [],
    filters: {},
    selectedTask: null,
    loading: false,
    error: null,
  },
  reducers: {
    addTask: (state, action) => {
      console.log(action.payload);
      const exists = state.tasks.some((t) => t.id === action.payload.id);
      if (!exists) state.tasks.push(action.payload);
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },

    updateTask: (state, action) => {
      const { id, ...updatedFields } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) Object.assign(task, updatedFields);
    },

    updateTaskStatus: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.status =
          task.status === "ToDo" ? "InProgress" : task.status === "InProgress" ? "Done" : "InProgress";
      }
    },

    selectTask: (state, action) => {
      state.selectedTask = state.tasks.find(
        (task) => task.id === action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      });
  },
});

export const {
  addTask,
  deleteTask,
  updateTask,
  updateTaskStatus,
  selectTask,
} = TicketSlice.actions;

export default TicketSlice.reducer;
