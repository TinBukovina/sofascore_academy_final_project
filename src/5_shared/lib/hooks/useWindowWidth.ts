// src/5_shared/lib/hooks/useWindowWidth.ts
"use client";

import { useEffect, useState } from "react";

export function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      console.log("Resizing, new width from hook:", window.innerWidth);
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        console.log("Cleaning up resize listener from hook");
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return windowWidth;
}
