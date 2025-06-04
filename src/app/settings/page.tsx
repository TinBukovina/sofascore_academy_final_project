"use client";

import { Flex } from "../../../styled-system/jsx";
import { SettingsComponent } from "@/3_features/settings/ui/SettingsComponent";

export default function Page() {
  return (
    <Flex
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      w={"100%"}
    >
      <SettingsComponent />
    </Flex>
  );
}
