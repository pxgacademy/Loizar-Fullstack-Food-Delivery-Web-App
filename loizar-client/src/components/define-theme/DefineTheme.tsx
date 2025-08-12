import React from "react";
import { THEMES } from "../../constants/theme-collection";
import { useThemeStore } from "../../stores/useThemeStore";

const DefineTheme: React.FC = () => {
  const { setTheme, theme } = useThemeStore();

  if (!theme)
    return (
      <div>
        <span>Loading...</span>
      </div>
    );

  return (
    <div className="dropdown dropdown-left p-0">
      <div tabIndex={0} role="button" className="py-1.5 px-2.5">
        Theme
      </div>
      <ul
        tabIndex={0}
        className="max-h-96 overflow-y-auto flex-nowrap dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        {THEMES?.map((t: string) => (
          <li key={t} role="button" onClick={() => setTheme(t)}>
            <a className={`${theme === t && "bg-primary/20"}`}>{t}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DefineTheme;
