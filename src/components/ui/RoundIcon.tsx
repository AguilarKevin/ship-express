import { ViewProps } from "tamagui";
import { View } from "../Themed";

export type RoundIconProps = {
  icon: React.ReactNode;
} & ViewProps;

export default function RoundIcon({ icon, ...props }: RoundIconProps) {
  return (
    <View
      width={34}
      height={34}
      rounded="$9"
      items="center"
      justify="center"
      {...props}
    >
      {icon}
    </View>
  );
}
