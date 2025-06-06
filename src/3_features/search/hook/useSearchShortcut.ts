"use client";

import { useCallback, useEffect } from "react";
import { useSearch } from "../context/useSearch";

export const useSearchShortcut = () => {
  const { setIsSearchDisplayed } = useSearch();

  const handleShortcut = useCallback(
    (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();

        setIsSearchDisplayed(true);
      }
    },
    [setIsSearchDisplayed]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, [handleShortcut]);
};
