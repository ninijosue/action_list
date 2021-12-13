import * as React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import globalStyles from "../global-styles";
import ListOfContent from '../screens/contents-list';
import Header from './header';
import Login from "../screens/login";
import CreateAccount from '../screens/create-account';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import auth from "@react-native-firebase/auth";

const Stack = createNativeStackNavigator();

const App = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => onAuthStateChanged(user, dispatch));
    return subscriber; // unsubscribe on unmount
  }, []);

  return (

    <NavigationContainer>
      <Stack.Navigator>

        {
          !user
            ? (
              <React.Fragment>
                <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="createAccount" component={CreateAccount} options={{ headerShown: false }} />
              </React.Fragment>
            )
            : <Stack.Screen name="listOfContent" component={ListOfContent} options={{ headerShown: false }} />
        }
      </Stack.Navigator>
    </NavigationContainer>

  );
}


const onAuthStateChanged = (user, dispatch) => {
  if (user) {
    dispatch({
      type: 'UPDATE_USER',
      user: user
    });
  }
  else dispatch({
    type: 'UPDATE_USER',
    user: null
  });

}

export default App;