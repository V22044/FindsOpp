import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Home from "./src/components/screens/Home.js";
import Profile from "./src/components/screens/Profile.js";
import SearchTab from "./src/components/screens/SearchTab.js";
import Saved from "./src/components/screens/Saved.js";
import Login from "./src/components/screens/Login.js";
import Register from "./src/components/screensAuth/Register.js";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { LightTheme, DarkTheme } from "./src/theme/scheme.js";
import {
  BookmarksProvider,
  useBookmarks,
} from "./src/context/BookmarksContext";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";

const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTabs = ({ theme, onLogout }) => (
  <BottomTab.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: theme.colors.surface,
        borderTopColor: theme.colors.outlineVariant,
        borderTopWidth: 1,
      },
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
      tabBarLabelStyle: { fontSize: 12, fontWeight: "500" },
    }}
  >
    <BottomTab.Screen
      name="Home"
      component={Home}
      options={{
        title: "Home",
        tabBarIcon: ({ color }) => (
          <FontAwesome name="home" size={24} color={color} />
        ),
      }}
    />
    <BottomTab.Screen
      name="SearchTab"
      component={SearchTab}
      options={{
        title: "Search",
        tabBarIcon: ({ color }) => (
          <FontAwesome name="search" size={24} color={color} />
        ),
      }}
    />
    <BottomTab.Screen
      name="Saved"
      component={Saved}
      options={{
        title: "Saved",
        tabBarIcon: ({ color }) => (
          <FontAwesome name="star" size={24} color={color} />
        ),
      }}
    />
    <BottomTab.Screen
      name="Profile"
      options={{
        title: "My Profile",
        tabBarIcon: ({ color }) => (
          <FontAwesome name="user" size={24} color={color} />
        ),
      }}
    >
      {(props) => <Profile {...props} onLogout={onLogout} />}
    </BottomTab.Screen>
  </BottomTab.Navigator>
);

const AuthStack = ({ onLogin }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login">
      {(props) => <Login {...props} onLogin={onLogin} />}
    </Stack.Screen>
    <Stack.Screen name="Register" component={Register} />
  </Stack.Navigator>
);

// 👇 Separated into its own component so it can use useBookmarks
const AppContent = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : LightTheme;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { clearBookmarks, loadBookmarks } = useBookmarks();
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          await loadBookmarks();
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking login state:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkLogin();
  }, []);

  const handleLogin = async () => {
    await loadBookmarks();
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    clearBookmarks();
    setIsLoggedIn(false);
  };

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
          <MainTabs theme={theme} onLogout={handleLogout} /> // 👈 uses handleLogout
        ) : (
          <AuthStack onLogin={handleLogin} />
        )}
      </NavigationContainer>
    </PaperProvider>
  );
};

// 👇 App just wraps everything with BookmarksProvider
export const App = () => {
  return (
    <BookmarksProvider>
      <AppContent />
    </BookmarksProvider>
  );
};

export default App;
