"use client";

import { useSettings } from "@/3_features/settings";
import { Box } from "@styled-system/jsx";
import Image from "next/image";
import React from "react";

export default function MainLogo() {
  const { theme } = useSettings();

  let logoUrl = "/images/sofascore_logo_small.png";

  if (theme === "light") {
    logoUrl = "/images/sofascore_logo_small_black.png";
  }

  return (
    <Box display={{ base: "none", md: "flex" }}>
      <Image
        src={logoUrl}
        width={160}
        height={26}
        alt="Sofascore logo"
        priority={true}
      />
    </Box>
  );
}
