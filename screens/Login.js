import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import { Button,TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const onLoginPress = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        console.log('sign in successful')
        const usersRef = firestore().collection('users');
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert('User does not exist anymore.');
              return;
            }
            const user = firestoreDocument.data();
            navigation.navigate('firstView',{User:user});
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  // const profile = async () => {
  //   setemail_1(await AsyncStorage.getItem('Email_1'));
  //   setPassword1(await AsyncStorage.getItem('Password_1'));
  // };
  // profile();

  // const handleError =()=>{
  //   if (email === '' || password === '') {
  //       Alert.alert('Error', 'Please fill both email and password', [
  //         {text: 'Okay'},
  //       ]);
  //     } else if (email != email_1) {
  //       Alert.alert('Log in Failed', 'Email Address not registered ', [
  //         {text: 'Okay'},
  //       ]);
  //       setEmail('');
  //     } else if (password != password_1) {
  //       Alert.alert('Login Failed', 'Wrong Password', [
  //         {text: 'Okay'},
  //       ]);
  //       setPassword('');
  //     } else {
  //       navigation.navigate('firstView');
  //       setEmail('');
  //       setPassword('');
  //     }

  // }
  //  const onLoginPress = async (email, password) => {
  //   try {
  //     let response = await auth().signInWithEmailAndPassword(email, password)
  //     if (response && response.user) {
  //       Alert.alert("Success ✅", "Authenticated successfully")
  //     }
  //   } catch (e) {
  //     console.error(e.message)
  //   }
  // }

  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.textInput}>
          <Text style={styles.title}>Video Player</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            label="Email"
            
           
            style={styles.input}
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
          <TextInput
            style={styles.input}
            label="Password"
           
            value={password}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.btn}>
          <Button
            mode="contained"
            color="grey"
            onPress={onLoginPress}>
            Login
          </Button>
        </View>
        
        <View style={styles.btn}>
          <Button
            mode="contained"
            color="teal"
            onPress={() => navigation.navigate('signup')}>
            Sign-up
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  inputContainer: {
    margin: 30,
    },
  textInput: {
    margin: 40,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight:'bold'
  },
  input: {
    marginVertical: 10,
},
  btn: {
    marginHorizontal: 30,
    marginVertical:10,
  },
});