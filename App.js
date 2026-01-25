import { NavigationContainer } from "@react-navigation/native";
//import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import icon from "./src/components/UI/icon.js";
import Home from "./src/components/screens/Home.js";
import Profile from "./src/components/screens/Profile.js";
import SearchTab from "./src/components/screens/SearchTab.js";
import Saved from "./src/components/screens/Saved.js";

const BottomTab = createBottomTabNavigator();

export const App = () => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
            tabBarIcon: ({}) => (
              <Image source={icon.Home} style={{ width: 20, height: 20 }} />
            ),
          }}
        />
        <BottomTab.Screen
          name="SearchTab"
          component={SearchTab}
          options={{
            title: "Search",
            tabBarIcon: ({}) => (
              <Image source={icon.Search} style={{ width: 20, height: 20 }} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Saved"
          component={Saved}
          options={{
            title: "Saved",
            tabBarIcon: ({}) => (
              <Image source={icon.Saved} style={{ width: 20, height: 20 }} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={Profile}
          options={{
            title: "My Profile",
            tabBarIcon: ({}) => (
              <Image source={icon.Profile} style={{ width: 20, height: 20 }} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default App;
