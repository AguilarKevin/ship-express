import { useRouter } from "expo-router";

type RouterPushArg = Parameters<ReturnType<typeof useRouter>["push"]>[0];

declare global {
  type AppRoute = RouterPushArg;
}
