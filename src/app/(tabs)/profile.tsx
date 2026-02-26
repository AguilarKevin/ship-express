import { ScrollView } from "@/components/Themed";
import {
  History,
  Info,
  MapPinned,
  Package,
  PhoneForwarded,
  UserCircle2
} from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import {
  H5,
  ListItem,
  Separator,
  Text,
  YGroup,
  YStack,
  type ListItemProps
} from "tamagui";

const sections: Array<{
  title?: string;
  options: Array<{
    title: string;
    icon: ListItemProps["icon"];
    link: AppRoute;
  }>;
}> = [
  {
    title: "Perfil",
    options: [
      {
        title: "Mi Perfil",
        icon: <UserCircle2 />,
        link: "/profile/edit"
      },
      {
        title: "Historial de entregas",
        icon: <History />,
        link: "/profile/delivery-history"
      },
      {
        title: "Mis Direcciones",
        icon: <MapPinned />,
        link: "/profile/addresses"
      }
    ]
  },
  {
    options: [
      {
        title: "Historial de paquetes",
        icon: <Package />,
        link: "/packages/history"
      }
    ]
  },
  {
    title: "Soporte",
    options: [
      {
        title: "Historial de solicitudes de soporte",
        icon: <History />,
        link: "/support/history"
      },
      {
        title: "Como hacer un pedido?",
        icon: <Info />,
        link: "/support/how-to-order"
      },
      {
        title: "Contacto",
        icon: <PhoneForwarded />,
        link: "/(modals)/contact-info"
      }
    ]
  },
  {
    options: [
      {
        title: "Cerrar sesión",
        icon: <History />,
        link: "/auth/login"
      }
    ]
  }
] as const;

export default function ProfileIndexScreen() {
  const router = useRouter();

  return (
    <ScrollView>
      <YStack
        style={{
          ...styles.container,
          backgroundClip: "transparent"
        }}
      >
        <Text
          style={{
            alignSelf: "center"
          }}
        >
          Ship Express
        </Text>
        <Separator />

        <YStack
          style={{
            flex: 0
          }}
        >
          <Text>Kevin Aguilar</Text>
          <Text>Casillero: KA-897112</Text>
        </YStack>

        {sections.map((section, index) => (
          <YStack key={index} marginBlockStart="$2" width="100%">
            {section.title && <H5 size="$3">{section.title}</H5>}
            <YGroup
              borderWidth={1}
              borderColor="$borderColor"
              size="$4"
              overflow="hidden"
              marginBlockStart="$3"
            >
              {section.options.map((option, index) => (
                <>
                  <YGroup.Item key={index}>
                    <ListItem
                      title={option.title}
                      icon={option.icon}
                      size="$3"
                      iconSize="$5"
                      paddingBlock="$4"
                      paddingInline="$4"
                      onPress={() => router.push(option.link)}
                    />
                  </YGroup.Item>

                  {index < section.options.length - 1 && <Separator />}
                </>
              ))}
            </YGroup>
          </YStack>
        ))}
      </YStack>
      {/* <Stack></Stack> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingInline: 20,
    paddingBlock: 20,
    gap: 10,
    backgroundColor: "$background"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  }
});
