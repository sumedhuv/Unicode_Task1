import { useNavigation } from '@react-navigation/native';
import React,{useState} from 'react';
import {StyleSheet,ScrollView, Text,TextInput,Button, View,Image,Dimensions,ActivityIndicator,TouchableOpacity,Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

const Search = () => {
  
  const navigation = useNavigation();
  const[loading,setLoading]=useState(false);
  const[data,setData]=useState({});
  const[display,setDisplay]=useState(false);
  const[search,setSearch]=useState('');
  const videos =[];
 
const fetchData= ()=>{
  setLoading(true);
 fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&key=AIzaSyB2ecKMxwXrxonR9-R-LMpDEBVP67PqJJc&q=${search}`)
 .then(res =>res.json())
 .then(obj=> {
   
   
   setData(obj.items);
   setLoading(false);
    setDisplay(true);
  

  
})


}
const FavouritesHandler= (vimeo)=>{
  const uid= vimeo.id.videoId;
  const Favref = firestore().collection('favourites');
  Favref
  .doc(uid)
  .set(vimeo)
  .then(navigation.navigate('Favourites', {uid: uid}))
  .catch((error) => {
    alert(error);
  })
  .catch((error) => {
    console.log(error);
  });
  


}
  


if(display===true){
    for(let i of data){
        videos.push(
        <TouchableOpacity key={data[data.indexOf(i)].id.videoId} onLongPress={()=> 
          Alert.alert(
            "Favourites",
            "Add to Favourites?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Yes", onPress: () => { const vimeo=data[data.indexOf(i)];FavouritesHandler(vimeo)}}
            ],
            { cancelable: false }
          )
       } onPress={()=> navigation.navigate('Video',{ videoId: data[data.indexOf(i)]})}> 
       
          <View style={{flexDirection:"row",margin:10,marginBottom:1}}>  
            
              <Image 
               source={{uri:`https://i.ytimg.com/vi/${data[data.indexOf(i)].id.videoId}/hqdefault.jpg`}}
               style={{
                width:'45%',
                borderWidth:1,
                borderColor:'black',
                height:100,
              
                }} />
          
             
               <View style={{
                 paddingHorizontal:10
                 
                 }}> 
                 <Text style={{
                  fontSize:17,
                  width:170,
                   color:'black'
                  }}
                  
                numberOfLines={3}> {data[data.indexOf(i)].snippet.title}</Text>
                 <Text style={{fontSize:12, color:'black'}}>{data[data.indexOf(i)].snippet.channelTitle}</Text>
                 
          
                </View>
                </View>
                </TouchableOpacity>
 )
                }
              }

    


return (
 
   
  <View style={styles.container}>
    <View style={styles.inputContainer}> 
    
    <TextInput style={styles.textInput}  onChangeText={(data)=>setSearch(data)}> </TextInput>
    <Ionicons
            style={styles.search}
            
           name="send"
           size={40}
           onPress={()=>fetchData()}
           />
           
</View> 
  {loading ?<ActivityIndicator style={{marginTop:10}} size="large" color="black"/>:null} 
<ScrollView style={{width:'100%'}}>
  {videos}
  </ScrollView>
  </View>
      );
};

export default Search;

const styles = StyleSheet.create({ 
container: {
  flex: 1,
  alignItems:'center',
  backgroundColor:'lightgrey'
},
inputContainer: {
  
  flexDirection:'row',
  position: 'relative',
  
  
  },
textInput: {borderWidth:2,height:50,borderColor:'black',width:'80%',margin:10}, 

search: {color:'black',marginTop:15},});