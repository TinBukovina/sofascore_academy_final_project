"use client";

import React from "react";
import { useSettings } from "../context/useSettings";
import { SettingsWindow } from "./SettingsWindow";

export default function SettingsWindowCompoents() {
  const { areOptionsDisplayed, setAreOptionsDisplayed } = useSettings();
  return (
    <SettingsWindow
      isOpen={areOptionsDisplayed}
      onClose={() => {
        setAreOptionsDisplayed(false);
      }}
    />
  );
}
