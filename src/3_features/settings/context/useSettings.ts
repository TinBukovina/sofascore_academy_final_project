import { useContext } from "react";
import { SettingsContextInterface } from "../modal/contextTypes";
import { SettingsContext } from "./SettingContext";

export const useSettings = (): SettingsContextInterface => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useSettings must be used within a Settings provider");
  }

  return context;
};
