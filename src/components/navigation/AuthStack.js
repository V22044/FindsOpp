import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login.js";
import Register from "../screensAuth/Register.js";
import InterestList from "../screensAuth/InterestList.js";

const Stack = createNativeStackNavigator();

const AuthStack = ({ onLogin }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login">
      {(props) => <Login {...props} onLogin={onLogin} />}
    </Stack.Screen>
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="InterestList">
      {(props) => <InterestList {...props} onLogin={onLogin} />}
    </Stack.Screen>
  </Stack.Navigator>
);

export default AuthStack;
