import 'dotenv/config';

export default ({ config }) => {
  return {
    name: "Family Traditions",
    slug: "FamilyTraditions",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "light",
    jsEngine: "jsc",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      jsEngine: "jsc"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      bundler: "metro",
      favicon: "./assets/favicon.png"
    },
    plugins: [
      ["expo-router", { "root": "./src" }]
    ],
    extra: {
      apiUrl: process.env.EXPO_PUBLIC_API_URL,
      clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
    },
  };
};
