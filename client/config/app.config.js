import '../config/loadEnv';

export default ({ config }) => {
  return {
    ...config,
    extra: {
      apiUrl: process.env.EXPO_PUBLIC_API_URL,
      clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
    },
    jsEngine: "jsc", // Use JavaScriptCore instead of Hermes
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
    },
  };
};
