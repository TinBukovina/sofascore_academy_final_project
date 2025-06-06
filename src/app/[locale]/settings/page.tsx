"use client";

import { SettingsComponent } from "@/3_features/settings/ui/SettingsComponent";
import { Flex } from "@styled-system/jsx";

export default function Page() {
  return (
    <Flex
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      w={"100%"}
      h={"100%"}
    >
      <SettingsComponent />
    </Flex>
  );
}
