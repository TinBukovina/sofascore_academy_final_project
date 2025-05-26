import { defineConfig } from "@pandacss/dev";

import { breakpoints } from "./design_system/brakepoints";
import { colors } from "./design_system/colors";
import { spacings } from "./design_system/spacings";
import { fontSizes } from "./design_system/typografy";
import { radii } from "./design_system/radii";
import { keyframes } from "./design_system/keyframes";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  jsxFramework: "react",

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      breakpoints,
      keyframes: keyframes,
    },
    semanticTokens: {
      colors,
    },
    tokens: {
      spacing: spacings,
      fontSizes,
      radii,
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
