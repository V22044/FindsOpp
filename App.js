import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/components/screens/Home";

const NavStack = createNativeStackNavigator();
export const App = () => {
  return (
    <NavigationContainer>
      <NavStack.Navigator initialRouteName="Home">
        <NavStack.Screen
          name="Home"
          component={Home}
          options={{ title: "home" }}
        />
      </NavStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
