import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    extra: {
      apiUrl: process.env.EXPO_PUBLIC_API_URL,
      clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
    },
    jsEngine: "jsc", // Ensure JavaScriptCore is used instead of Hermes
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
    },
  };
};
