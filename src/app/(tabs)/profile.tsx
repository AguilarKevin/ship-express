import { ScrollView } from "@/components/Themed";
import { containerStyles } from "@/constants/Styles";
import { supabase } from "@/lib/supabase";
import {
  History,
  Info,
  LogOut,
  MapPinned,
  Package,
  PhoneForwarded,
  UserCircle2
} from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
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
    link?: AppRoute;
    action?: "logout";
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
        icon: <LogOut />,
        action: "logout"
      }
    ]
  }
] as const;

export default function ProfileIndexScreen() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleLogout = async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);

    const { error } = await supabase.auth.signOut();
    setIsSigningOut(false);

    if (error) {
      console.error("Sign out error:", error.message);
      return;
    }

    router.replace("/auth/login");
  };

  return (
    <ScrollView>
      <YStack
        style={{
          ...containerStyles.styles
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
                <YStack key={index}>
                  <YGroup.Item>
                    <ListItem
                      title={
                        option.action === "logout" && isSigningOut
                          ? "Cerrando sesión..."
                          : option.title
                      }
                      icon={option.icon}
                      size="$3"
                      iconSize="$5"
                      paddingBlock="$4"
                      paddingInline="$4"
                      disabled={option.action === "logout" && isSigningOut}
                      onPress={() => {
                        if (option.action === "logout") {
                          void handleLogout();
                          return;
                        }

                        if (option.link) {
                          router.push(option.link);
                        }
                      }}
                    />
                  </YGroup.Item>

                  {index < section.options.length - 1 && <Separator />}
                </YStack>
              ))}
            </YGroup>
          </YStack>
        ))}
      </YStack>
    </ScrollView>
  );
}
