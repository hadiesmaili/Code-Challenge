import { FilterStatus, Task, TaskState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TaskState = {
  items: [],
  filter: "all",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.items.unshift(action.payload);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.items.find((t) => t.id === action.payload);
      if (task) task.isCompleted = !task.isCompleted;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<FilterStatus>) => {
      state.filter = action.payload;
    },
    reorderTasks: (state, action: PayloadAction<Task[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addTask, toggleTask, deleteTask, setFilter, reorderTasks } =
  taskSlice.actions;
export default taskSlice.reducer;
