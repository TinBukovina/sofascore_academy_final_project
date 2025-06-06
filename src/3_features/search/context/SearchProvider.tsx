"use client";

import { ReactNode, useState } from "react";
import { SearchContext } from "./SearchContext";

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [isSearchDisplayed, setIsSearchDisplayed] = useState<boolean>(false);

  return (
    <SearchContext.Provider value={{ isSearchDisplayed, setIsSearchDisplayed }}>
      {children}
    </SearchContext.Provider>
  );
};
