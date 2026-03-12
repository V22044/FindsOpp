import { NavigationContainer } from "@react-navigation/native";
//import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Home from "./src/components/screens/Home.js";
import Profile from "./src/components/screens/Profile.js";
import SearchTab from "./src/components/screens/SearchTab.js";
import Saved from "./src/components/screens/Saved.js";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { LightTheme, DarkTheme } from "./src/theme/scheme.js";

const BottomTab = createBottomTabNavigator();

export const App = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : LightTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <BottomTab.Navigator
          screenOptions={{
            headerShown: false,

            //Bottom tab bar style
            tabBarStyle: {
              backgroundColor: theme.colors.surface,
              borderTopColor: theme.colors.outlineVariant,
              borderTopWidth: 1,
            },
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "500",
            },
          }}
        >
          <BottomTab.Screen
            name="Home"
            component={Home}
            options={{
              title: "Home",
              tabBarIcon: ({}) => (
                <FontAwesome
                  name="home"
                  size={24}
                  color={theme.colors.onSurface}
                />
              ),
            }}
          />
          <BottomTab.Screen
            name="SearchTab"
            component={SearchTab}
            options={{
              title: "Search",
              tabBarIcon: ({}) => (
                <FontAwesome
                  name="search"
                  size={24}
                  color={theme.colors.onSurface}
                />
              ),
            }}
          />
          <BottomTab.Screen
            name="Saved"
            component={Saved}
            options={{
              title: "Saved",
              tabBarIcon: ({}) => (
                <FontAwesome
                  name="star"
                  size={24}
                  color={theme.colors.onSurface}
                />
              ),
            }}
          />
          <BottomTab.Screen
            name="Profile"
            component={Profile}
            options={{
              title: "My Profile",
              tabBarIcon: ({}) => (
                <FontAwesome
                  name="user"
                  size={24}
                  color={theme.colors.onSurface}
                />
              ),
            }}
          />
        </BottomTab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
