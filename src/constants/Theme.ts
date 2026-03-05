import {
  green,
  greenDark,
  red,
  redDark,
  yellow,
  yellowDark
} from "@tamagui/colors";
import { createV5Theme, defaultChildrenThemes } from "@tamagui/config/v5";
import { v5ComponentThemes } from "@tamagui/themes/v5";

const darkPalette = [
  "hsla(0, 0%, 1%, 1)",
  "hsla(0, 0%, 6%, 1)",
  "hsla(0, 0%, 12%, 1)",
  "hsla(0, 0%, 17%, 1)",
  "hsla(0, 0%, 23%, 1)",
  "hsla(0, 0%, 28%, 1)",
  "hsla(0, 0%, 34%, 1)",
  "hsla(0, 0%, 39%, 1)",
  "hsla(0, 0%, 45%, 1)",
  "hsla(0, 0%, 50%, 1)",
  "hsla(0, 0%, 93%, 1)",
  "hsla(0, 0%, 99%, 1)"
];
const lightPalette = [
  "hsla(0, 0%, 99%, 1)",
  "hsla(0, 0%, 94%, 1)",
  "hsla(0, 0%, 88%, 1)",
  "hsla(0, 0%, 83%, 1)",
  "hsla(0, 0%, 77%, 1)",
  "hsla(0, 0%, 72%, 1)",
  "hsla(0, 0%, 66%, 1)",
  "hsla(0, 0%, 61%, 1)",
  "hsla(0, 0%, 55%, 1)",
  "hsla(0, 0%, 50%, 1)",
  "hsla(0, 0%, 15%, 1)",
  "hsla(0, 0%, 1%, 1)"
];

// Your custom accent color theme
const accentLight = {
  accent1: "hsla(25, 95%, 45%, 1)",
  accent2: "hsla(25, 95%, 48%, 1)",
  accent3: "hsla(25, 95%, 51%, 1)",
  accent4: "hsla(25, 95%, 54%, 1)",
  accent5: "hsla(25, 95%, 57%, 1)",
  accent6: "hsla(25, 95%, 60%, 1)",
  accent7: "hsla(25, 95%, 63%, 1)",
  accent8: "hsla(25, 95%, 66%, 1)",
  accent9: "hsla(25, 95%, 69%, 1)",
  accent10: "hsla(25, 95%, 72%, 1)",
  accent11: "hsla(25, 95%, 75%, 1)",
  accent12: "hsla(25, 95%, 78%, 1)"
};

const accentDark = {
  accent1: "hsla(25, 90%, 40%, 1)",
  accent2: "hsla(25, 90%, 43%, 1)",
  accent3: "hsla(25, 90%, 46%, 1)",
  accent4: "hsla(25, 90%, 49%, 1)",
  accent5: "hsla(25, 90%, 52%, 1)",
  accent6: "hsla(25, 90%, 55%, 1)",
  accent7: "hsla(25, 90%, 58%, 1)",
  accent8: "hsla(25, 90%, 61%, 1)",
  accent9: "hsla(25, 90%, 64%, 1)",
  accent10: "hsla(25, 90%, 67%, 1)",
  accent11: "hsla(25, 90%, 70%, 1)",
  accent12: "hsla(25, 90%, 73%, 1)"
};

const builtThemes = createV5Theme({
  darkPalette,
  lightPalette,
  componentThemes: v5ComponentThemes,
  accent: {
    light: accentLight,
    dark: accentDark
  },
  childrenThemes: {
    // Include default color themes (blue, red, green, yellow, etc.)
    ...defaultChildrenThemes,

    // Semantic color themes for warnings, errors, and success states
    warning: {
      light: yellow,
      dark: yellowDark
    },
    error: {
      light: red,
      dark: redDark
    },
    success: {
      light: green,
      dark: greenDark
    }
  }
});

export type Themes = typeof builtThemes;

// the process.env conditional here is optional but saves web client-side bundle
// size by leaving out themes JS. tamagui automatically hydrates themes from CSS
// back into JS for you, and the bundler plugins set TAMAGUI_ENVIRONMENT. so
// long as you are using the Vite, Next, Webpack plugins this should just work,
// but if not you can just export builtThemes directly as themes:
export const themes: Themes =
  process.env.TAMAGUI_ENVIRONMENT === "client" &&
  process.env.NODE_ENV === "production"
    ? ({} as any)
    : (builtThemes as any);
