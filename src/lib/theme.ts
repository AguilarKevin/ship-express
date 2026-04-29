import {type ColorSchemeName} from "react-native";
import {type ThemeParsed} from "tamagui";

export const getStatusBadgeColor = (
  theme: ThemeParsed,
  colorScheme: ColorSchemeName,
  status: PackageStatus,
  isDark: boolean
) => {
  const statusConfig = {
    "Delivered": { color: "green", darkBg: theme.gray4, darkOrangeBg: theme.orange9 },
    "In Transit": { color: "blue", darkBg: theme.gray2, darkOrangeBg: theme.orange7 },
    "Customs": { color: "yellow", darkBg: theme.gray4, darkOrangeBg: theme.orange9 },
  } as const;

  const config = statusConfig[status as keyof typeof statusConfig] || { color: "gray", darkBg: theme.gray4, darkOrangeBg: theme.orange };
  const colorKey = config.color;

  const isDarkMode = colorScheme === "dark";
  
  return {
    bg: isDarkMode
      ? (isDark ? config.darkOrangeBg : config.darkBg)
      : (isDark ? theme[`${colorKey}5`] : theme[`${colorKey}3`]),
    color: isDark
      ? (isDarkMode ? theme.white : theme[`${colorKey}11`])
      : (isDarkMode ? theme[`${colorKey}10`] : theme[`${colorKey}11`])
  };
};
