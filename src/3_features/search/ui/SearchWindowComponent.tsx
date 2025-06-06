"use client";

import React from "react";
import { SearchWindow } from "./SearchWindow";
import { useSearch } from "../context/useSearch";
import { useSearchShortcut } from "../hook/useSearchShortcut";

export default function SearchWindowComponent() {
  const { isSearchDisplayed, setIsSearchDisplayed } = useSearch();
  useSearchShortcut();
  return (
    <SearchWindow
      isOpen={isSearchDisplayed}
      onClose={() => {
        setIsSearchDisplayed(false);
      }}
    />
  );
}
