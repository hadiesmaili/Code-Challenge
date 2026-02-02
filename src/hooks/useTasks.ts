import { generateId } from "@/src/lib/utils";
import { AppDispatch, RootState } from "@/src/store";
import {
  addTask,
  deleteTask,
  reorderTasks,
  setFilter,
  toggleTask,
} from "@/src/store/taskSlice";
import { FilterStatus, Task } from "@/types";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

/**
 * Custom hook to abstract all Task-related Redux operations.
 * Promotes logic reuse and component decoupling.
 */
export const useTasks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, filter } = useSelector((state: RootState) => state.tasks);
  const { t } = useTranslation();

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "completed":
        return items.filter((t) => t.isCompleted);
      case "pending":
        return items.filter((t) => !t.isCompleted);
      default:
        return items;
    }
  }, [items, filter]);

  const handleAddTask = useCallback(
    (title: string, description: string) => {
      if (!title.trim()) return;

      const newTask: Task = {
        id: generateId(),
        title,
        description,
        isCompleted: false,
        createdAt: Date.now(),
      };

      dispatch(addTask(newTask));
      toast.success(t("feedback.added"));
    },
    [dispatch, t],
  );

  const handleToggleTask = useCallback(
    (id: string) => {
      dispatch(toggleTask(id));
      toast.info(t("feedback.toggled"));
    },
    [dispatch, t],
  );

  const handleDeleteTask = useCallback(
    (id: string) => {
      dispatch(deleteTask(id));
      toast.error(t("feedback.deleted"));
    },
    [dispatch, t],
  );

  const handleSetFilter = useCallback(
    (status: FilterStatus) => {
      dispatch(setFilter(status));
    },
    [dispatch],
  );

  const handleReorder = useCallback(
    (newItems: Task[]) => {
      dispatch(reorderTasks(newItems));
    },
    [dispatch],
  );

  return {
    items,
    filteredTasks,
    filter,
    addTask: handleAddTask,
    toggleTask: handleToggleTask,
    deleteTask: handleDeleteTask,
    setFilter: handleSetFilter,
    reorderTasks: handleReorder,
  };
};
