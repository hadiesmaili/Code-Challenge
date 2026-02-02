import { Button } from "@/src/components/ui/Button";
import { useTasks } from "@/src/hooks/useTasks";
import { cn } from "@/src/lib/utils";
import { Task } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CheckCircle2, Circle, GripVertical, Trash2 } from "lucide-react";
import React from "react";

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = React.memo(({ task }) => {
  const { toggleTask, deleteTask } = useTasks();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-xl transition-all",
        task.isCompleted
          ? "opacity-60 bg-slate-50"
          : "hover:border-indigo-200 hover:shadow-md",
        isDragging &&
          "opacity-50 cursor-grabbing shadow-2xl border-indigo-400 scale-[1.02]",
      )}
    >
      <button
        {...attributes}
        {...listeners}
        className="mt-1 text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing"
      >
        <GripVertical size={20} />
      </button>

      <button
        onClick={() => toggleTask(task.id)}
        className={cn(
          "mt-1 flex-shrink-0 transition-colors",
          task.isCompleted
            ? "text-emerald-500"
            : "text-slate-300 hover:text-indigo-400",
        )}
      >
        {task.isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
      </button>

      <div className="flex-1 min-w-0">
        <h3
          className={cn(
            "text-base font-semibold truncate",
            task.isCompleted && "line-through text-slate-400",
          )}
        >
          {task.title}
        </h3>
        {task.description && (
          <p
            className={cn(
              "text-sm mt-1 text-slate-600 line-clamp-2",
              task.isCompleted && "text-slate-400",
            )}
          >
            {task.description}
          </p>
        )}
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => deleteTask(task.id)}
        className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-500 hover:bg-rose-50"
      >
        <Trash2 size={18} />
      </Button>
    </div>
  );
});
