import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/assets/styles/AuthScreen.styles";
import { TextInput } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { SvgXml } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";

type Mode = "login" | "register";

export default function AuthScreen() {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVerifying(true);
    }, 1500);
  };

  const handleVerify = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace("/(tabs)");
    }, 1500);
  };

  // Logo
  const svgMarkup = `
<svg width="295" height="295" viewBox="0 0 295 295" fill="none" xmlns="http://www.w3.org/2000/svg">

  <!-- Premium Orbit Ring -->
  <ellipse
    cx="147.5"
    cy="142"
    rx="110"
    ry="50"
    transform="rotate(-24 147.5 142)"
    stroke="url(#ring)"
    stroke-width="10"
    fill="none"
    stroke-linecap="round"
  />

  <!-- Main Bubble -->
  <path
    d="M147 50C90 50 46 91 46 142C46 193 90 234 147 234C165 234 182 229 197 219L233 229L222 194C235 181 244 163 244 142C244 91 200 50 147 50Z"
    fill="url(#bubble)"
  />

  <!-- Front Orbit -->
  <path
    d="M64 178C90 201 125 216 164 216C199 216 230 204 254 184"
    stroke="url(#ring)"
    stroke-width="10"
    stroke-linecap="round"
    fill="none"
  />

  <!-- Chat Dots -->
  <circle cx="113" cy="142" r="8.5" fill="#ffffff"/>
  <circle cx="147" cy="142" r="8.5" fill="#FAF7FF"/>
  <circle cx="181" cy="142" r="8.5" fill="#EFE7FF"/>

  <!-- Orbit Sphere -->
  <circle
    cx="238"
    cy="100"
    r="13"
    fill="url(#sphere)"
  />

  <!-- Accent -->
  <circle
    cx="62"
    cy="80"
    r="4"
    fill="#D4AF37"
    opacity="0.95"
  />

  <!-- Gradients -->
  <defs>

    <!-- Bubble -->
    <linearGradient id="bubble" x1="46" y1="50" x2="240" y2="240">
      <stop offset="0%" stop-color="#111827"/>
      <stop offset="55%" stop-color="#1F2937"/>
      <stop offset="100%" stop-color="#424B5C"/>
    </linearGradient>

    <!-- Gold Orbit -->
    <linearGradient id="ring" x1="30" y1="30" x2="280" y2="280">
      <stop offset="0%" stop-color="#FFF0BD"/>
      <stop offset="45%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#9E6A10"/>
    </linearGradient>

    <!-- Sphere -->
    <radialGradient
      id="sphere"
      cx="0"
      cy="0"
      r="1"
      gradientUnits="userSpaceOnUse"
      gradientTransform="translate(238 100) rotate(90) scale(14)"
    >
      <stop stop-color="#FFF7D8"/>
      <stop offset="1" stop-color="#C9971A"/>
    </radialGradient>

  </defs>

</svg>
`;

  if (verifying) {
    return (
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          style={styles.kav}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
          >
            {/* Logo */}
            <View style={styles.logoRow}>
              <LinearGradient
                colors={[Colors.primary, Colors.primaryContainer]}
                style={styles.logoBox}
              >
                <SvgXml xml={svgMarkup} width="100%" height="100%" />
              </LinearGradient>
              <Text style={styles.appName}>Orbit</Text>
            </View>

            {/* Hero text */}
            <Text style={styles.heading}>Verify Email</Text>
            <Text style={styles.subheading}>
              We have sent a 6-digit verification code to {email}.
            </Text>

            {/* Form */}
            <View style={styles.form}>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Verification Code</Text>
                <TextInput
                  style={styles.input}
                  value={verificationCode}
                  onChangeText={setVerificationCode}
                  placeholder="Enter your 6-digit code"
                  placeholderTextColor={Colors.outlineVariant}
                  keyboardType="number-pad"
                  autoCapitalize="none"
                />
              </View>

              {/* Back to sign up link */}
              <View style={styles.toggleRow}>
                <Text style={styles.toggleText}>Did not receive a code?</Text>
                <TouchableOpacity onPress={() => setVerifying(false)}>
                  <Text style={styles.toggleLink}>Go Back</Text>
                </TouchableOpacity>
              </View>

              {/* Submit */}
              <TouchableOpacity
                onPress={handleVerify}
                disabled={loading}
                activeOpacity={0.88}
                style={styles.btnWrapper}
              >
                <LinearGradient
                  colors={[Colors.primary, Colors.primaryContainer]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.btn}
                >
                  {loading ? (
                    <ActivityIndicator color={Colors.primary} size="small" />
                  ) : (
                    <>
                      <Text style={styles.btnText}>Verify Code</Text>
                      <Ionicons
                        name="arrow-forward"
                        size={18}
                        color={Colors.onPrimary}
                      />
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <View style={styles.logoRow}>
            <LinearGradient
              colors={[Colors.primary, Colors.primaryContainer]}
              style={styles.logoBox}
            >
              <SvgXml xml={svgMarkup} width="100%" height="100%" />
            </LinearGradient>
            <Text style={styles.appName}>Orbit</Text>
          </View>

          {/* Hero text */}
          <Text style={styles.heading}>
            {mode === "login" ? "Welcome Back 👋" : "Create Account"}
          </Text>
          <Text style={styles.subheading}>
            {mode === "login"
              ? "Sign in to continue chatting"
              : "Fill in your details to get started"}
          </Text>

          {/* Form */}
          <View style={styles.form}>
            {mode === "register" && (
              <>
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Full Name</Text>
                  <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Your Name"
                    placeholderTextColor={Colors.outlineVariant}
                    autoCapitalize="words"
                  />
                </View>
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Username</Text>
                  <View style={styles.handleRow}>
                    <Text style={styles.atSign}>@</Text>
                    <TextInput
                      style={[styles.input, styles.handleInput]}
                      value={handle}
                      onChangeText={(v) =>
                        setHandle(v.toLocaleLowerCase().replace(/\s/g, ""))
                      }
                      placeholder="username"
                      placeholderTextColor={Colors.outlineVariant}
                      autoCapitalize="none"
                    />
                  </View>
                </View>
              </>
            )}

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor={Colors.outlineVariant}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="********"
                placeholderTextColor={Colors.outlineVariant}
                secureTextEntry
              />
            </View>

            {/* Toggle mode */}
            <View style={styles.toggleRow}>
              <Text style={styles.toggleText}>
                {mode === "login"
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </Text>
              <TouchableOpacity
                onPress={() => setMode(mode === "login" ? "register" : "login")}
              >
                <Text style={styles.toggleLink}>
                  {mode === "login" ? "Sign up" : "Sign in"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Submit */}
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={loading}
              activeOpacity={0.88}
              style={styles.btnWrapper}
            >
              <LinearGradient
                colors={[Colors.primary, Colors.primaryContainer]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.btn}
              >
                {loading ? (
                  <ActivityIndicator color={Colors.primary} size="small" />
                ) : (
                  <>
                    <Text style={styles.btnText}>
                      {mode === "login" ? "Sign In" : "Create Account"}
                    </Text>
                    <Ionicons
                      name="arrow-forward"
                      size={18}
                      color={Colors.onPrimary}
                    />
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
