import React, {useState,useEffect} from 'react';
import {Alert, StyleSheet, Text, View,ActivityIndicator,Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button, Card,Avatar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
var data;
const Profile = () => {
  

  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const gender = user['gender'];

  // const profile = async () => {
  //   setGender(await AsyncStorage.getItem('Gender_1'));
  //   setbday(await AsyncStorage.getItem('bday_1'));
  //   setName(await AsyncStorage.getItem('Name_1'));
  //   setEmail(await AsyncStorage.getItem('Email_1'));
  // };
  

  const getData = async () => {
    let uid = auth().currentUser.uid;
    const usersRef = firestore().collection('users');
    await usersRef
      .doc(uid)
      .get()
      .then((firestoreDocument) => {
        if (!firestoreDocument.exists) {
          Alert.alert('Error', 'User does not exist anymore', [{text: 'Okay'}]);
          return;
        }
        data = firestoreDocument.data();
        return data;
      })
      .then((data) => {
        setUser(data);
        return;
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    getData().then(setLoading(false));
  }, []);
  if (loading) {
    return (
      <ActivityIndicator style={{marginTop: '30%'}} size={40} color="red" />
    );
  }
  

  return (
    <View style={styles.container}>
        <Card style={styles.cardContainer}>
        <Avatar.Image style={{marginLeft:Dimensions.get('window').width/6,marginTop:10}} size={200} source={{uri:user['picture']}} /> 
        <View style={{flexDirection:'row'}}>
            <View style={{margin:20,marginRight:20}}>
                 <Text> <Ionicons name="person-circle" size={40} color='teal' />  </Text> 
             </View>
             <View style={{margin:20}}> 
              <Text numberOfLines={2} style={{fontSize:20}}> {user['name']} </Text>
              
              </View>
        
           
        </View>
        <View style={{flexDirection:'row'}}>
            <View style={{margin:20,marginRight:20}}>
                 <Text> <Ionicons name="calendar" size={40} color='teal' />  </Text> 
             </View>
             <View style={{margin:20}}> 
              <Text style={{fontSize:20}}> {user['bday']} </Text>
              
              </View>
        
           
        </View>
        <View style={{flexDirection:'row'}}>
            <View style={{margin:20,marginRight:20}}>
                 <Text> <Ionicons name="mail" size={40} color='teal' />  </Text> 
             </View>
             <View style={{margin:20,width:'80%'}}> 
              <Text  style={{fontSize:20}}> {user['email']}</Text>
              
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
              <Text style={{fontSize:20}}> {user['gender']}</Text>
              
              </View>
        
           
        </View>
        <View style={styles.btn}>
          <Button mode='contained' color='red' onPress={()=> {
            auth()
            .signOut()
            .then(()=> navigation.navigate('login')
          )}}>Log Out</Button>
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