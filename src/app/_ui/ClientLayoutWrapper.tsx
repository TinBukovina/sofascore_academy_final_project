import React, { ReactNode } from "react";
import { css } from "../../../styled-system/css";
import { Navigation } from "@/2_widgets/navigation";
import {
  BottomMobileNavigation,
  TopMobileNavigation,
} from "@/2_widgets/mobileNavigation";

export default function ClientLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <body
      className={css({
        display: "grid",
        gridTemplateColumns: { base: "unset", md: "auto 1fr" },
        gridTemplateRows: { base: "auto 1fr auto", md: "unset" },

        height: "100dvh",

        bg: "surface.s0",

        overflow: "hidden",
        overflowY: "auto",
      })}
    >
      <Navigation />
      <TopMobileNavigation />
      {children}
      <BottomMobileNavigation />
    </body>
  );
}
