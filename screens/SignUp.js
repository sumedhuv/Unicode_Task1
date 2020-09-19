import React, {useState} from 'react';
import {View,Text,Alert,KeyboardAvoidingView,ScrollView,Keyboard,StyleSheet
} from 'react-native';
import {TextInput, RadioButton, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';

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
  const[showDate,setShowDate]=useState(false);
  const dateDisplay = new Date();

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
  const DateSet=(date) =>{
      try{  if (date === 0) {
        return '';
      }
      date = String(date).split(' ');
      console.log(date)
      var str = date[1] + '/' + date[2] + '/' + date[3];
      return str;}
      catch(err){
          console.log(err)
      }
   
  }
  const handlerChangeDate = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      setbday(
      DateSet(selectedDate ) 
      );
      setShowDate(false);
    }
  };


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
         <View >
             <TextInput label="Birth Date" onFocus={() => {setShowDate(true);  Keyboard.dismiss(); }} value={bday}/>
         
         </View>
        {showDate ? (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateDisplay}
            mode={'date'}
            display="default"
            onChange={handlerChangeDate}
          />
        ) : (
          null
        )}
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