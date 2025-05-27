"use client";

import { useWindowWidth } from "@/5_shared/lib/hooks/useWindowWidth";
import React, { ReactNode } from "react";
import { css } from "../../../styled-system/css";
import { Navigation } from "@/2_widgets/navigation";
import { MobileNavigation } from "@/2_widgets/mobileNavigation";

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
        gridTemplateRows: windowWidth < 700 ? "1fr auto" : "unset",

        height: "100dvh",
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
          {children}
          <MobileNavigation />
        </>
      )}
    </body>
  );
}
