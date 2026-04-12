import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Home from "../screens/Home.js";
import Profile from "../screens/Profile.js";
import SearchTab from "../screens/SearchTab.js";
import Saved from "../screens/Saved.js";

const BottomTab = createBottomTabNavigator();

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

export default MainTabs;
