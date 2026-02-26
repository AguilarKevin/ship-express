import { defaultConfig } from "@tamagui/config/v5";
import { animations } from "@tamagui/config/v5-reanimated";
import { createTamagui } from "tamagui";
import { themes } from "./constants/Theme";

export const config = createTamagui({
  ...defaultConfig,
  animations,
  themes
});

type ThemeConfig = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends ThemeConfig {}
}
