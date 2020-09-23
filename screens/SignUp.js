import React, {useState} from 'react';
import {View,Text,Alert,KeyboardAvoidingView,ScrollView,Keyboard,StyleSheet
} from 'react-native';
import {TextInput, RadioButton, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Signup = () => {
  const Name_1 = 'Name_1';
  const Email_1 =  'Email_1';
  const bday_1 = 'bday_1';
  const Gender_1 = 'Gender_1';
  const Password_1 = 'Password_1';
  const navigation = useNavigation();


  const [gender, setGender] = useState('');
  const [bday, setbday] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
  
  const handleSignup =async()=>{
    if (
        name === '' ||
        password === '' ||
        email === '' ||
        bday === '' ||
        gender === ''
      ) {
        Alert.alert('Unsuccessful','Please fill all the required details', [
          {text: 'Okay'},
        ]);
      } else {
        try {
          await AsyncStorage.setItem(Name_1, name);
          await AsyncStorage.setItem (Email_1, email);
          await AsyncStorage.setItem(Password_1, password);
          await AsyncStorage.setItem(bday_1, bday);
          await AsyncStorage.setItem(Gender_1, gender);
        } catch (error) {
          console.log(error);
        }
        Alert.alert('Success','You have successfully signed up!', [
            {text: 'Continue'},
          ]);
       

        navigation.goBack();
      }

  }
  


  return (
    <ScrollView style={styles.container}>
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
              onPress={handleSignup}>
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
 
});