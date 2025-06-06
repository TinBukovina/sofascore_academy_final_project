"use client";

import { createContext } from "react";
import { SearchContextInterface } from "../types";

export const SearchContext = createContext<SearchContextInterface | null>(null);
