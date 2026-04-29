import {Plane, Ship} from "@tamagui/lucide-icons";
import {type ColorSchemeName, useColorScheme} from "react-native";
import {Card, Separator, ThemeParsed, useTheme, XStack, YStack} from "tamagui";
import {Text} from "../Themed";
import {Badge} from "./Badge";
import RoundIcon from "./RoundIcon";
import {getStatusBadgeColor} from "@/lib/theme";

export interface PackageCardProps {
  pkg: PackageItem;
  variant?: "black" | "white";
  size?: "short" | "full";
  onPress?: () => void;
}

export default function PackageCard({
  pkg,
  variant = "black",
  size = "short",
  onPress
}: PackageCardProps) {
  const theme = useTheme();
  const colorScheme = useColorScheme();

  const isBlack = variant === "black";

  const statusBadge = getStatusBadgeColor(theme, colorScheme, pkg.status, isBlack);
  const cardColors = getCardColorScheme(theme, colorScheme, isBlack);

  return (
    <Card bg={cardColors.bg} borderColor={cardColors.borderColor} onPress={onPress}>
      <Card.Header p="$4" gap="$3">
        <XStack items="center" gap="$3">
          <RoundIcon
            bg={cardColors.iconBg}
            icon={
              pkg.via === "Air" ? (
                <Plane size={18} color={cardColors.iconColor} />
              ) : (
                <Ship size={18} color={cardColors.iconColor} />
              )
            }
          />
          <YStack gap="$0.5">
            <Text fontSize="$4" fontWeight="700" color={cardColors.color}>
              {pkg.trackingCode}
            </Text>
            <Text color={cardColors.labelColor} fontSize="$2">
              Tracking code
            </Text>
          </YStack>

          <XStack marginInlineStart='auto' marginBlockEnd="auto" gap='$2' items="center">
            {size === 'short' &&
                <Text
                    fontSize="$2"
                    fontWeight="700"
                    color={theme.labelColor}
                >
                  NIC -
                </Text>
            }

            <Badge config={statusBadge}>
              {pkg.status}
            </Badge>
          </XStack>
        </XStack>
      </Card.Header>

      {size === 'full' && <>
        <Separator bg={cardColors.borderColor} opacity={0.2} />

        <Card.Footer p="$4">
          <XStack justify="space-between" width="100%">
            <YStack items="center" gap="$1">
              <Text fontWeight="700" color={cardColors.color}>
                NIC
              </Text>
              <Text color={cardColors.labelColor} fontSize="$2">
                Destination
              </Text>
            </YStack>
            <YStack items="center" gap="$1">
              <Text fontWeight="700" color={cardColors.color}>
                {pkg.via}
              </Text>
              <Text color={cardColors.labelColor} fontSize="$2">
                Via
              </Text>
            </YStack>
            <YStack items="center" gap="$1">
              <Text fontWeight="700" color={cardColors.color}>
                {pkg.dateAdded}
              </Text>
              <Text color={cardColors.labelColor} fontSize="$2">
                Date added
              </Text>
            </YStack>
          </XStack>
        </Card.Footer>
      </>
      }
    </Card>
  );
}

const getCardColorScheme = (
  theme: ThemeParsed,
  colorScheme: ColorSchemeName,
  isBlack: boolean
) => {
  const isDarkMode = colorScheme === "dark";

  return isBlack ? {
    bg: isDarkMode ? theme.accent4 : theme.black,
    color: theme.white,
    iconBg: isDarkMode ? theme.white : theme.accent12,
    iconColor: theme.orange10,
    labelColor: isDarkMode ? theme.orange7 : theme.color10,
    borderColor: isDarkMode ? theme.accent4 : theme.black
  } : {
    bg: isDarkMode ? theme.gray2 : theme.white,
    color: theme.color,
    iconBg: isDarkMode ? theme.gray4 : theme.orange2,
    iconColor: isDarkMode ? theme.white : theme.orange10,
    labelColor: theme.color10,
    borderColor: isDarkMode ? theme.gray10 : theme.black
  };
};
