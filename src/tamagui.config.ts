import { defaultConfig } from "@tamagui/config/v5";
import { createTamagui } from "tamagui";
import { themes } from "./constants/Theme";

export const config = createTamagui({
  ...defaultConfig,
  themes
});
