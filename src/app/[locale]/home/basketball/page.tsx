"use client";

import { SettingsWindow, useSettings } from "@/3_features/settings";

export default function Page() {
  const { areOptionsDisplayed, setAreOptionsDisplayed } = useSettings();

  return (
    <div>
      Basketball page
      <SettingsWindow
        isOpen={areOptionsDisplayed}
        onClose={() => {
          setAreOptionsDisplayed(false);
        }}
      />
    </div>
  );
}
