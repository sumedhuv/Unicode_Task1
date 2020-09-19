import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import firstView from './firstView'
import Login from '../screens/Login';
import Signup from '../screens/SignUp';



const Stack = createStackNavigator();




const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" >
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="firstView" component={firstView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;