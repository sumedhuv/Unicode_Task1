import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Button, Card} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Profile = () => {
  
  const [gender, setGender] = useState();
  const [bday, setbday] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const profile = async () => {
    setGender(await AsyncStorage.getItem('Gender_1'));
    setbday(await AsyncStorage.getItem('bday_1'));
    setName(await AsyncStorage.getItem('Name_1'));
    setEmail(await AsyncStorage.getItem('Email_1'));
  };
  profile();
  

  return (
    <View style={styles.container}>
       <Card style={styles.cardContainer}>
       
        <View style={{flexDirection:'row'}}>
            <View style={{margin:20,marginRight:20}}>
                 <Text> <Ionicons name="person-circle" size={40} color='teal' />  </Text> 
             </View>
             <View style={{margin:20}}> 
              <Text numberOfLines={2} style={{fontSize:20}}> {name}</Text>
              
              </View>
        
           
        </View>
        <View style={{flexDirection:'row'}}>
            <View style={{margin:20,marginRight:20}}>
                 <Text> <Ionicons name="calendar" size={40} color='teal' />  </Text> 
             </View>
             <View style={{margin:20}}> 
              <Text style={{fontSize:20}}> {bday}</Text>
              
              </View>
        
           
        </View>
        <View style={{flexDirection:'row'}}>
            <View style={{margin:20,marginRight:20}}>
                 <Text> <Ionicons name="mail" size={40} color='teal' />  </Text> 
             </View>
             <View style={{margin:20,width:'80%'}}> 
              <Text  style={{fontSize:20}}> {email}</Text>
              
              </View>
        
           
        </View>
        <View style={{flexDirection:'row'}}>
            <View style={{margin:20,marginRight:20}}>
                 <Text>  <Ionicons
                name={gender === 'male'? 'woman':'man'}
                size={40}
                color='teal'
              />  </Text> 
             </View>
             <View style={{margin:20}}> 
              <Text style={{fontSize:20}}> {gender}</Text>
              
              </View>
        
           
        </View>
      </Card>
      
      
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  cardContainer: {
    margin: 15,
    
    marginTop: 10,
  },
  btn: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
});