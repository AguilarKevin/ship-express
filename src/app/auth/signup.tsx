import { SafeAreaView, ScrollView, Text } from "@/components/Themed";
import { containerStyles } from "@/constants/Styles";
import { supabase } from "@/lib/supabase";
import { Eye, EyeOff, Lock, Mail } from "@tamagui/lucide-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Form, Input, Label, View, YStack } from "tamagui";

const signUpSchema = z
  .object({
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters")
  })
  .refine(values => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = async (values: SignUpFormValues) => {
    setAuthError(null);
    setSuccessMessage(null);

    const { data, error } = await supabase.auth.signUp({
      email: values.email.trim(),
      password: values.password
    });

    if (error) {
      setAuthError(error.message);
      return;
    }

    if (data.session) {
      router.replace("/");
      return;
    }

    setSuccessMessage("Account created. Check your email to confirm your account.");
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <YStack
          style={{
            ...containerStyles.styles,
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <YStack mb="$4">
            <Text fontSize="$6" fontWeight="bold">
              Create Account
            </Text>
            <Text fontSize="$3">
              Sign up to start managing your deliveries.
            </Text>
          </YStack>

          <Form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
            <YStack gap="$3" mb="$4">
              <YStack gap="$0.25">
                <Label htmlFor="email">Email</Label>
                <YStack position="relative">
                  <View
                    pointerEvents="none"
                    position="absolute"
                    insetInlineStart="$3"
                    insetBlock="$0"
                    z="$1"
                    justify="center"
                  >
                    <Mail size={16} color="$color8" />
                  </View>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        id="email"
                        type="email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        pl="$8"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                </YStack>
                {errors.email?.message ? (
                  <Text color="$red10" marginBlockStart="$2">
                    {errors.email.message}
                  </Text>
                ) : null}
              </YStack>

              <YStack gap="$0.25">
                <Label htmlFor="password">Password</Label>
                <YStack position="relative">
                  <View
                    pointerEvents="none"
                    position="absolute"
                    insetInlineStart="$3"
                    insetBlock="$0"
                    z="$1"
                    justify="center"
                  >
                    <Lock size={16} color="$color8" />
                  </View>
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                        pl="$8"
                        pr="$8"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onPress={() => setShowPassword(prev => !prev)}
                    style={({ pressed }) => ({
                      position: "absolute",
                      right: 8,
                      top: "50%",
                      marginTop: -16,
                      width: 32,
                      height: 32,
                      borderRadius: 10,
                      backgroundColor: pressed
                        ? "rgba(0,0,0,0.05)"
                        : "rgba(0,0,0,0.01)",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 1,
                      transform: [{ scale: pressed ? 0.96 : 1 }]
                    })}
                  >
                    {showPassword ? (
                      <EyeOff size={16} color="$color8" />
                    ) : (
                      <Eye size={16} color="$color8" />
                    )}
                  </Pressable>
                </YStack>
                {errors.password?.message ? (
                  <Text color="$red10" marginBlockStart="$2">
                    {errors.password.message}
                  </Text>
                ) : null}
              </YStack>

              <YStack gap="$0.25">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <YStack position="relative">
                  <View
                    pointerEvents="none"
                    position="absolute"
                    insetInlineStart="$3"
                    insetBlock="$0"
                    z="$1"
                    justify="center"
                  >
                    <Lock size={16} color="$color8" />
                  </View>
                  <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        secureTextEntry={!showConfirmPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                        pl="$8"
                        pr="$8"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    onPress={() => setShowConfirmPassword(prev => !prev)}
                    style={({ pressed }) => ({
                      position: "absolute",
                      right: 8,
                      top: "50%",
                      marginTop: -16,
                      width: 32,
                      height: 32,
                      borderRadius: 10,
                      backgroundColor: pressed
                        ? "rgba(0,0,0,0.05)"
                        : "rgba(0,0,0,0.01)",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 1,
                      transform: [{ scale: pressed ? 0.96 : 1 }]
                    })}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} color="$color8" />
                    ) : (
                      <Eye size={16} color="$color8" />
                    )}
                  </Pressable>
                </YStack>
                {errors.confirmPassword?.message ? (
                  <Text color="$red10" marginBlockStart="$2">
                    {errors.confirmPassword.message}
                  </Text>
                ) : null}
              </YStack>
            </YStack>

            <YStack gap="$3" marginBlockStart="$8">
              {authError ? <Text color="$red10">{authError}</Text> : null}
              {successMessage ? <Text color="$green10">{successMessage}</Text> : null}
              <Button onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
                Create Account
              </Button>
              <Button variant="outlined" onPress={() => router.push("/auth/login")}>
                Back to Sign In
              </Button>
            </YStack>
          </Form>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
