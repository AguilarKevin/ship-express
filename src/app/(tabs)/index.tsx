import {SafeAreaView, ScrollView, Text} from "@/components/Themed";
import PackageCard from "@/components/ui/PackageCard";
import {containerStyles} from "@/constants/Styles";
import {useRouter} from "expo-router";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Separator, XStack, YStack} from "tamagui";
import {useState} from "react";

type PackageStatus = "Pending" | "In Transit" | "Delivered" | "Customs";
type ShippingVia = "Air" | "Ocean";

type PackageItem = {
  id: string;
  trackingCode: string;
  status: PackageStatus;
  via: ShippingVia;
  dateAdded: string;
};

const mockPackages: PackageItem[] = [
  {
    id: "pkg-1",
    trackingCode: "SE-349183-DO",
    status: "In Transit",
    via: "Air",
    dateAdded: "2026-02-10"
  },
  {
    id: "pkg-2",
    trackingCode: "SE-983412-DO",
    status: "Pending",
    via: "Ocean",
    dateAdded: "2026-02-14"
  },
  {
    id: "pkg-3",
    trackingCode: "SE-417296-DO",
    status: "Customs",
    via: "Air",
    dateAdded: "2026-02-20"
  },
  {
    id: "pkg-4",
    trackingCode: "SE-559201-DO",
    status: "Delivered",
    via: "Ocean",
    dateAdded: "2026-02-24"
  }
];

export default function TabHomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [[firstPackage, ...packages], setPackages] = useState(mockPackages);

  return (
    <SafeAreaView edges={["top"]}>
      <ScrollView
        width="100%"
        contentContainerStyle={{
          width: "100%",
          paddingBlockEnd: insets.bottom + 96
        }}
      >
        <YStack style={containerStyles.styles} width="100%" self="stretch">
          <YStack>
            <Text fontSize="$7" fontWeight="700">
              My Packages
            </Text>
            <Text color="$color10">Latest packages in your account</Text>
          </YStack>

          <YStack width="100%" self="stretch" marginBlockStart="$2" gap="$4">
            <PackageCard
                key={firstPackage.id}
                pkg={firstPackage}
                size="full"
                variant="black"
                onPress={() => router.push(`/packages/${firstPackage.id}`)}
            />


            <Separator />

            <XStack justify="space-between">
              <Text
                  fontSize="$3"
                  fontWeight="700"
              >Recent packages</Text>
              <Text
                  fontSize="$2"
                  color="$color10"
                  fontWeight="500"
              >Show all</Text>
            </XStack>
            {packages.map((item, index) => {
              return (
                <PackageCard
                  key={item.id}
                  pkg={item}
                  size="short"
                  variant="white"
                  onPress={() => router.push(`/packages/${item.id}`)}
                />
              );
            })}
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
