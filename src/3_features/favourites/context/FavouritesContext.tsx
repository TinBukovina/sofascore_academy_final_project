"use client";

import { createContext } from "react";
import { FavouritesContextType } from "../model/types";

export const FavouritesContext = createContext<FavouritesContextType | null>(
  null
);
