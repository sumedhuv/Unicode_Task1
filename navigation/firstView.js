
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import Favourites from '../screens/Favourites';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'


const Tab = createBottomTabNavigator();
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
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Favourites" component={Favourites} />
       
      </Tab.Navigator>
    );
  };

  export default firstView;