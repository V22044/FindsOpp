import { View, ActivityIndicator } from "react-native";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { LightTheme, DarkTheme } from "../theme/scheme.js";
import { useAuthSession } from "./useAuthSession";
import MainTabs from "../components/navigation/MainTabs";
import AuthStack from "../components/navigation/AuthStack.js";

const AppContent = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : LightTheme;
  const { isLoggedIn, isLoading, handleLogin, handleLogout } = useAuthSession();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {isLoggedIn ? (
          <MainTabs theme={theme} onLogout={handleLogout} />
        ) : (
          <AuthStack onLogin={handleLogin} />
        )}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default AppContent;
