import { Button } from "@/src/components/ui/Button";
import { useTasks } from "@/src/hooks/useTasks";
import { Plus } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export const TaskInput: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (title.trim()) {
        addTask(title, description);
        setTitle("");
        setDescription("");
      }
    },
    [title, description, addTask],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4"
    >
      <div className="space-y-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t("tasks.placeholder_title")}
          className="w-full px-4 py-2 text-lg font-semibold border-none focus:ring-0 placeholder:text-slate-400"
          autoFocus
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t("tasks.placeholder_desc")}
          className="w-full px-4 py-2 text-sm text-slate-600 border-none focus:ring-0 resize-none min-h-[60px] placeholder:text-slate-400"
        />
      </div>
      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          disabled={!title.trim()}
          className="flex items-center gap-2"
        >
          <Plus size={18} />
          {t("tasks.add")}
        </Button>
      </div>
    </form>
  );
});
