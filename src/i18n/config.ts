import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      app: {
        title: "Tasks",
        subtitle: "Organize your workflow seamlessly",
      },
      tasks: {
        add: "Add Task",
        placeholder_title: "Task Title",
        placeholder_desc: "Description (optional)",
        empty: "No tasks found. Time to relax!",
        completed: "Completed",
        pending: "Pending",
        all: "All",
        delete: "Delete",
        filter_label: "Filter tasks:",
      },
      feedback: {
        added: "Task added successfully!",
        deleted: "Task removed.",
        toggled: "Task status updated.",
        reordered: "Tasks reordered.",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
