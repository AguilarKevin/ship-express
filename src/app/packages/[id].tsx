import {SafeAreaView, ScrollView, Text, View} from "@/components/Themed";
import PackageCard from "@/components/ui/PackageCard";
import {containerStyles} from "@/constants/Styles";
import {Stack, useLocalSearchParams} from "expo-router";
import {Card, Separator, useTheme, XStack, YStack} from "tamagui";
import {getStatusBadgeColor} from "@/lib/theme";
import {useColorScheme} from "react-native";


const mockPackages: PackageItem[] = [
  {
    id: "pkg-1",
    trackingCode: "SE-349183-DO",
    status: "In Transit",
    via: "Air",
    dateAdded: "2026-02-10",
    timeline: [
      {
        id: "p1-t1",
        title: "Package received",
        description: "Your package was received at the Miami warehouse.",
        date: "2026-02-10",
        status: "Delivered"
      },
      {
        id: "p1-t2",
        title: "Departed origin",
        description: "Shipment departed from the origin facility.",
        date: "2026-02-12",
        status: "Delivered"
      },
      {
        id: "p1-t3",
        title: "In transit",
        description: "Package is currently in transit to destination country.",
        date: "2026-02-14",
        status: "Delivered"
      },
      {
        id: "p1-t4",
        title: "Out for delivery",
        description: "Package will be scheduled for local delivery soon.",
        date: "Pending",
        status: "In Transit"
      }
    ]
  },
  {
    id: "pkg-2",
    trackingCode: "SE-983412-DO",
    status: "Pending",
    via: "Ocean",
    dateAdded: "2026-02-14",
    timeline: [
      {
        id: "p2-t1",
        title: "Package registered",
        description: "Order was created and is waiting for drop-off.",
        date: "2026-02-14",
        status: "Delivered"
      },
      {
        id: "p2-t2",
        title: "Awaiting shipment",
        description: "Package will be loaded on next ocean batch.",
        date: "Pending",
        status: "In Transit"
      }
    ]
  },
  {
    id: "pkg-3",
    trackingCode: "SE-417296-DO",
    status: "Customs",
    via: "Air",
    dateAdded: "2026-02-20",
    timeline: [
      {
        id: "p3-t1",
        title: "Package received",
        description: "Your package was received at the Miami warehouse.",
        date: "2026-02-20",
        status: "Delivered"
      },
      {
        id: "p3-t2",
        title: "In transit",
        description: "Package arrived to destination country.",
        date: "2026-02-22",
        status: "Delivered"
      },
      {
        id: "p3-t3",
        title: "Customs review",
        description: "Shipment is under customs review.",
        date: "2026-02-24",
        status: "Delivered"
      },
      {
        id: "p3-t4",
        title: "Released by customs",
        description: "Awaiting customs release before local dispatch.",
        date: "Pending",
        status: "Customs"
      }
    ]
  },
  {
    id: "pkg-4",
    trackingCode: "SE-559201-DO",
    status: "Delivered",
    via: "Ocean",
    dateAdded: "2026-02-24",
    timeline: [
      {
        id: "p4-t1",
        title: "Package received",
        description: "Package arrived at origin warehouse.",
        date: "2026-02-24",
        status: "Delivered"
      },
      {
        id: "p4-t2",
        title: "In transit",
        description: "Shipment moved through ocean freight route.",
        date: "2026-02-26",
        status: "Delivered"
      },
      {
        id: "p4-t3",
        title: "Local dispatch",
        description: "Package was sent to local delivery hub.",
        date: "2026-02-27",
        status: "Delivered"
      },
      {
        id: "p4-t4",
        title: "Delivered",
        description: "Package successfully delivered.",
        date: "2026-02-28",
        status: "Delivered"
      }
    ]
  }
];

export default function PackageDetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const packageId = Array.isArray(id) ? id[0] : id;
  const pkg = mockPackages.find(item => item.id === packageId);
  const theme = useTheme();
  const colorScheme = useColorScheme();

  if (!pkg) {
    return (
      <SafeAreaView edges={["top"]}>
        <YStack style={containerStyles.styles}>
          <Text fontSize="$6" fontWeight="700">
            Package not found
          </Text>
          <Text color="$color10">No package exists for id: {packageId}</Text>
        </YStack>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          headerTitle: "Package Details"
        }}
      />
      <YStack style={containerStyles.styles} width="100%" gap="$8">
        <PackageCard pkg={pkg} size="full" variant='black'/>
        <YStack gap="$4" marginBlock='$2'>
          <Card bg="$color1">
            <Card.Header p="$4" gap="$3">
              <Text fontSize="$6" fontWeight="700">
                Package Details
              </Text>
            </Card.Header>
            <Separator />
            <Card.Footer>
             <YStack width="100%" gap="$4">
               <YStack paddingInline="$4" paddingBlockStart="$4" gap="$4">
                 <XStack justify='space-between'>
                   <Text fontSize="$2" fontWeight="500" color="$color10">
                     Weight
                   </Text>
                   <Text>10 kg</Text>
                 </XStack>

                 <XStack justify='space-between'>
                   <Text fontSize="$2" fontWeight="500" color="$color10">
                     Weight
                   </Text>
                   <Text>10 kg</Text>
                 </XStack>
               </YStack >
               <Separator />
               <YStack gap="$0" paddingInline="$4" paddingBlockStart="$4">
                 {pkg.timeline?.map((event, index) => {
                   const badgeConfig = getStatusBadgeColor(theme, colorScheme, event.status, false)
                   const isLast = index === pkg.timeline!.length - 1;
                   return (
                       <XStack key={event.id} gap="$3">
                         <YStack items="center">
                           <View
                               width={16}
                               height={16}
                               rounded="$9"
                               borderWidth={1}
                               borderColor="$accent1"
                               items="center"
                               justify="center"
                           >
                             <View
                                 width={10}
                                 height={10}
                                 rounded="$9"
                                 bg="$accent1"
                             />
                           </View>
                           {!isLast ? (
                               <YStack flex={1} gap={6} paddingBlock={2}>
                                 {Array.from({ length: 5 }).map((_, i) => (
                                     <View
                                         key={i}
                                         width={1.5}
                                         height={5}
                                         bg="$accent1"
                                     />
                                 ))}
                               </YStack>
                           ) : null}
                         </YStack>

                         <YStack flex={1} gap="$1.5" paddingBlockEnd={20}>
                           <XStack
                               justify="space-between"
                               items="flex-start"
                               gap="$2"
                           >
                             <Text flex={1} fontWeight="700">
                               {event.title}
                             </Text>
                             <Text color="#6B7280" fontSize="$2">
                               {event.date}
                             </Text>
                           </XStack>
                           <Text color="#6B7280">{event.description}</Text>
                         </YStack>
                       </XStack>
                   );
                 })}
               </YStack>
             </YStack>
            </Card.Footer>
          </Card>
        </YStack>
      </YStack>
    </ScrollView>
  );
}
