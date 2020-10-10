
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import Video from '../screens/Video';
import Favourites from '../screens/Favourites';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';






const Tab = createBottomTabNavigator();
const Stack= createStackNavigator();

const searchscreen=()=>{
  return(
    
      <Stack.Navigator headerMode="none">
        <Stack.Screen name= 'Screen' component={Search}/>
        <Stack.Screen name='Video' component={ Video}/>
        <Stack.Screen name="Favourites" component={Favourites} />

  
      </Stack.Navigator>

    
  )
}
const firstView = () => {
    return (
      <Tab.Navigator
      
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
         
          if (route.name === 'Search') {
            return <Ionicons name="search-circle" size={28} color={color} />;
          } else if (route.name === 'Favourites') {
            return <Ionicons name="star" size={28} color={color} />;
          } else {
            return (
              <Ionicons
                name="person"
                size={28}
                color={color}
              />
            );
          }
        },
      })}
       
        tabBarOptions={{
          activeTintColor: 'skyblue',
          inactiveTintColor: 'grey',
          
        }}>
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Search" component={searchscreen}  />
        <Tab.Screen name="Favourites" component={Favourites} />
       
      </Tab.Navigator>
    );
  };

  export default firstView;