import InterestList from "../screensAuth/InterestList.js";
import { useColorScheme } from "react-native";
import { LightTheme, DarkTheme } from "../../theme/scheme.js";
import MainTabs from "./MainTabs.js";
import SearchTab from "../screens/SearchTab.js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const MainStack = ({ onLogout }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : LightTheme;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainApp">
        {(props) => <MainTabs {...props} theme={theme} onLogout={onLogout} />}
      </Stack.Screen>
      <Stack.Screen name="EditInterests" component={InterestList} />
      <Stack.Screen name="SearchTab" component={SearchTab} />
    </Stack.Navigator>
  );
};

export default MainStack;
