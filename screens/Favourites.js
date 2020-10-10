import React,{useEffect,useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import {StyleSheet, Text, View,Image,ActivityIndicator,FlatList,ScrollView} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';

const Favourites = () => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [videos, setVideos] = useState([]);
  const navigation = useNavigation(); 
  const data=[];
  useEffect(() => {
    const videos = firestore()
      .collection('favourites')
      .onSnapshot(querySnapshot => {
        const videoss = [];
  
        querySnapshot.forEach(documentSnapshot => {
          videoss.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
  
        setVideos(videoss);
        
        setLoading(false);
       
      });
  
    
  }, []);
  console.log(videos);
 
 for(let i of videos){
   data.push(
     <TouchableOpacity key={videos[videos.indexOf(i)].id.videoId} onPress={()=> navigation.navigate('Video',{ videoId: videos[videos.indexOf(i)]})}>
    <View style={{flexDirection:"row",margin:10,marginBottom:1}}>  
            
    <Image 
      source={{uri:`https://i.ytimg.com/vi/${videos[videos.indexOf(i)].id.videoId}/hqdefault.jpg`}}
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
        
      numberOfLines={3}> {videos[videos.indexOf(i)].snippet.title} </Text>
       <Text style={{fontSize:12, color:'black'}}> {videos[videos.indexOf(i)].snippet.channelTitle}</Text>
       
  
      </View>
      </View>
      </TouchableOpacity>

   )
 }
 
  if (loading) {
    return <ActivityIndicator />;
  }
 
  
  return (
    
    <ScrollView style={{width:'100%'}}>
         {data}
       </ScrollView>
     
    
    
  );
};

export default Favourites;

const styles = StyleSheet.create({});