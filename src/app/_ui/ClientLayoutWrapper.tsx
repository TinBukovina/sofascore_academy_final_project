"use client";

import { useWindowWidth } from "@/5_shared/lib/hooks/useWindowWidth";
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
  const windowWidth = useWindowWidth();

  return (
    <body
      className={css({
        display: "grid",
        gridTemplateColumns: windowWidth > 700 ? "auto 1fr" : "unset",
        gridTemplateRows: windowWidth < 700 ? "auto 1fr auto" : "unset",

        height: "100dvh",

        bg: "surface.s0",

        overflow: "hidden",
        overflowY: "auto",
      })}
    >
      {windowWidth > 700 || !windowWidth ? (
        <>
          <Navigation />
          {children}
        </>
      ) : (
        <>
          <TopMobileNavigation />
          {children}
          <BottomMobileNavigation />
        </>
      )}
    </body>
  );
}
