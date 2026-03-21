'use client';

import React, { createContext, useContext, useState } from 'react';

interface DarkModeContextType {
  isDark: boolean;
  toggleDark: () => void;
}

const DarkModeContext = createContext<DarkModeContextType>({ isDark: false, toggleDark: () => {} });

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);
  return (
    <DarkModeContext.Provider value={{ isDark, toggleDark: () => setIsDark(!isDark) }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}
