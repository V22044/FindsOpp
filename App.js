import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./src/components/screens/Home";
import { createStackNavigator } from "@react-navigation/stack";

const NavStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: "Home",
      },
    },
  },
  {
    initialRouteName: "Home",
  }
);
const App = () => {
  return (
    <NavigationContainer>
      <NavStack.Navigator>
        <NavStack.Screen name="Home" component={Home} />
      </NavStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
