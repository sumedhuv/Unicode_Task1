import React, {useState} from 'react';
import {View,Text,Alert,KeyboardAvoidingView,ScrollView,Keyboard,StyleSheet,Image,Dimensions
} from 'react-native';
import {TextInput, RadioButton, Button,Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const Signup = () => {
  const navigation = useNavigation();


  const [gender, setGender] = useState('');
  const [bday, setbday] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [picture, setPicture] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (bday) => {
    setbday(
     JSON.stringify(bday).slice(1, 11),
    );
    hideDatePicker();
  };
  
  const onRegisterPress = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;

        let account = {};
        account.id = response.user.uid;
        account.gender = gender;
        account.bday = bday;
        account.name = name;
        account.password = password;
        account.email = email.toLowerCase();
        account.picture=picture;

        const usersRef = firestore().collection('users');
        usersRef
          .doc(uid)
          .set(account)
          .then(navigation.navigate('login', {uid: uid}))
          .catch((error) => {
            alert(error);
          })
          .catch((error) => {
            console.log(error);
          });

      });
      auth()
       .signOut()
       .then(() => console.log('User signed out!'));
  };

 const options = {
    title: 'Select Picture',
    mediaType: 'photo',
    quality:1,
    maxWidth:500,
    maxHeight:500
  
  };
  const selectPicture = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Error:',response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ');
      } else {
        
        setPicture( response.uri);
        console.log(picture);
      }
    });
  };
  


  return (
    
    <ScrollView style={styles.container}>
      <TouchableOpacity
      
       onPress={selectPicture}>
          {picture === '' ? (
           <Avatar.Image
           size={200}
           style={{marginLeft:Dimensions.get('window').width/5,marginTop:10}}
           source={require('./sample.png')}
         /> 
          ) : (
           
               <Avatar.Image style={{marginLeft:Dimensions.get('window').width/5,marginTop:10}} size={200} source={{uri:picture}} /> 
             
          )}
        </TouchableOpacity>
      <KeyboardAvoidingView>
        <View style={styles.container}>
        

          <View style={styles.inputContainer}>
                 
         
            <TextInput
              label="Name"
              value={name}
              onChangeText={(value) => setName(value)}
             style={styles.input}
              
            />

            <TextInput
              label="Email"
              
              value={email}
              onChangeText={(value) => setEmail(value)}
              style={styles.input}
            />
            <TextInput
              label="Set Password"
             
              value={password}
              onChangeText={(value) => setPassword(value)}
              style={styles.input}
              secureTextEntry={true}
            />
         <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            
            <TouchableOpacity onPress={showDatePicker}> 
            <Ionicons name="calendar" style={{paddingVertical:8,marginRight:5,backgroundColor:'rgb(223, 225, 230)',borderRadius:5}}size={40} color='black' />
            </TouchableOpacity>
              <TextInput
                placeholder="YYYY-MM-DD"
                style={{width:'85%'}}
              
                autoCapitalize="none"
                keyboardType={'number-pad'}
                value={bday}
            
                onChangeText={(val) =>   setbday(val)}
              />
             
             
         </View>
       
         
      <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
     </View>
          
          <View style={styles.inputGender}>
          <RadioButton.Group
            onValueChange={(value) => setGender( value)}
            value={gender}>
            <View>
              <Text>Male</Text>
              <RadioButton value="Male" />
            </View>
            <View>
              <Text>Female</Text>
              <RadioButton value="Female" />
            </View>
            <View>
              <Text>Other</Text>
              <RadioButton value="Other" />
            </View>
          </RadioButton.Group>
        </View>  
          
          
          <View style={styles.btn}>
            <Button
             mode="contained"
              color="teal"
              onPress={onRegisterPress}>
              Sign-up
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  inputContainer: {
    margin: 30,
    marginTop: 15,
  },
  input: {
    marginVertical: 10,
  },
 
  btn: {
    marginHorizontal: 30,
  },

  inputGender: {
    flexDirection: 'row',
    width: '90%',
    height: 80,
    marginVertical: 10,
    justifyContent: 'space-evenly',
 
    
  },
  profile:{
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 80,
    borderRadius: 40,
  }
  
 
});