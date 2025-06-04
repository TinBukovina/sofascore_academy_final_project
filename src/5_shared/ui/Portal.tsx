"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  selector?: string;
}

export function Portal({ children, selector = "#portal-root" }: PortalProps) {
  const [mounted, setMount] = useState<boolean>(false);
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    try {
      ref.current = document.querySelector(selector);
    } catch (error) {
      console.log(error);
      console.log(`Element with selector: ${selector}, not found.`);
    }

    setMount(true);
  }, [selector]);

  return mounted && ref.current ? createPortal(children, ref.current) : null;
}
