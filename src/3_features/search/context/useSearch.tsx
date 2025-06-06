"use client";

import { useContext } from "react";
import { SearchContextInterface } from "../types";
import { SearchContext } from "./SearchContext";

export const useSearch = (): SearchContextInterface => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error(
      "You need to use useSearch inside SearchProvider component."
    );
  }

  return context;
};
