import React from "react";
import {Text, View} from "../Themed";
import {ViewProps} from "tamagui";
import {Animated} from "react-native";
import ComponentProps = Animated.ComponentProps;

interface BadgeConfig {
  bg: ViewProps['bg'];
  color: ComponentProps<typeof Text>['color'];
}

type BadgeProps = {
  config: BadgeConfig;
  children: React.ReactNode;
} & ViewProps;

export function Badge({config, children, ...props }: BadgeProps) {

  return (
    <View
      bg={config.bg}
      paddingBlock={2}
      paddingInline={5}
      rounded="$1"
      items="center"
      justify="center"
      {...props}
    >
      <Text color={config.color} fontWeight="700" fontSize="$1">
        {children}
      </Text>
    </View>
  );
}