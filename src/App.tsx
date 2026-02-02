import { ErrorBoundary } from "@/src/components/errors/ErrorBoundary";
import {
  FilterBar,
  TaskInput,
  TaskList,
} from "@/src/features/tasks/components/";
import { Layout } from "lucide-react";
import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Toaster } from "sonner";

const App: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <ErrorBoundary>
      <Toaster position="top-right" richColors closeButton />
      <div className="max-w-2xl mx-auto px-4 py-12 md:py-20 ">
        <header className="mb-10 text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 text-indigo-600 rounded-2xl mb-4">
            <Layout size={32} />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            {t("app.title")}
          </h1>
          <p className="text-slate-500 font-medium">{t("app.subtitle")}</p>
        </header>

        <main className="space-y-6">
          <Suspense
            fallback={
              <div className="h-40 bg-slate-100 animate-pulse rounded-xl" />
            }
          >
            <TaskInput />
            <FilterBar />
            <TaskList />
          </Suspense>
        </main>

        {/* <footer className="fixed bottom-0 left-0 right-0 glass border-t border-slate-200 py-4 px-6"></footer> */}
      </div>
    </ErrorBoundary>
  );
};

export default App;
