import { createContext } from "react";
import { SettingsContextInterface } from "../modal/contextTypes";

export const SettingsContext = createContext<SettingsContextInterface | null>(
  null
);
