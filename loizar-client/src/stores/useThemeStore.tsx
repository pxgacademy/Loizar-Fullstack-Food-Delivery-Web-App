import { create } from "zustand";

type ThemeState = {
  theme: string;
  setTheme: (theme: string) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme:
    typeof window !== "undefined"
      ? localStorage.getItem("loizar-theme") || "coffee"
      : "coffee",
  setTheme: (theme: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("loizar-theme", theme);
    }
    set({ theme });
  },
}));
