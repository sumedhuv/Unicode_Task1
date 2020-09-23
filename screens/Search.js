import { useNavigation } from '@react-navigation/native';
import React,{useState} from 'react';
import {StyleSheet,ScrollView, Text,TextInput,Button, View,Image,Dimensions,ActivityIndicator,TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
  


if(display===true){
    for(let i of data){
      // console.log(data[data.indexOf(i)])
      // ()=> loadVideo(data[data.indexOf(i)].id.videoId)
        videos.push(
        <TouchableOpacity key={data[data.indexOf(i)].id.videoId} onPress={()=> navigation.navigate('Video',{ videoId: data[data.indexOf(i)]})}> 
       
          <View style={{flexDirection:"row",margin:10,marginBottom:0}}>  
            
              <Image 
               source={{uri:`https://i.ytimg.com/vi/${data[data.indexOf(i)].id.videoId}/hqdefault.jpg`}}
               style={{
                width:'45%',
                borderWidth:1,
                borderColor:'black',
                height:100
                }} />
          
             
               <View style={{
                 paddingLeft:7
                 
                 }}> 
                 <Text style={{
                  fontSize:17,
                  width:Dimensions.get("screen").width/2,
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
 
   
  <View style={{flex:1,alignItems:'center'}}>
    <View style={styles.inputContainer}> 
    
    <TextInput style={{borderWidth:2,height:50,borderColor:'black',width:'80%',margin:10}}  onChangeText={(data)=>setSearch(data)}> </TextInput>
    <Ionicons
            style={{color:'black',marginTop:15}}
            
           name="send"
           size={40}
           onPress={()=>fetchData()}
           />
           
</View> 
 

   
    
  {loading ?<ActivityIndicator style={{marginTop:10}} size="large" color="red"/>:null} 
<ScrollView style={{width:'100%'}}>
  {videos}
  </ScrollView>
  
  
  </View>
     
 
 
  
  );
};

export default Search;

const styles = StyleSheet.create({ 
  cardContainer: {
  margin: 15,
  height:100,
  flexDirection:'row',
  
  marginTop: 10,
  
},
container: {
  flex: 1,
  backgroundColor: 'skyblue',
},
inputContainer: {
  
  flexDirection:'row',
  position: 'relative',
  
  
  },
textInput: {
  margin: 40,
}, 

input: {
  marginVertical: 10,
},});