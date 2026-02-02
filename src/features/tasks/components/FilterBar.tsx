import { Button } from "@/src/components/ui/Button";
import { useTasks } from "@/src/hooks/useTasks";
import { FilterStatus } from "@/types";
import React from "react";
import { useTranslation } from "react-i18next";

export const FilterBar: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const { filter, setFilter } = useTasks();

  const statuses: FilterStatus[] = ["all", "pending", "completed"];

  return (
    <div className="flex items-center justify-between py-4">
      <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
        {t("tasks.filter_label")}
      </span>
      <div className="flex gap-2">
        {statuses.map((status) => (
          <Button
            key={status}
            variant={filter === status ? "primary" : "ghost"}
            size="sm"
            onClick={() => setFilter(status)}
            className="capitalize"
          >
            {t(`tasks.${status}`)}
          </Button>
        ))}
      </div>
    </div>
  );
});
