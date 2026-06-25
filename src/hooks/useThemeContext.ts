import { createContext, useContext } from "react";

export interface ThemeContextValue {
  isDark: boolean;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  isDark: true,
  toggle: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);
