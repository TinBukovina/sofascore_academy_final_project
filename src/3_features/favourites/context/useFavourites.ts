import { useContext } from "react";
import { FavouritesContextType } from "../model/types";
import { FavouritesContext } from "./FavouritesContext";

export const useFavourites = (): FavouritesContextType => {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error("useFavourites must be used within a Favourites provider");
  }

  return context;
};
