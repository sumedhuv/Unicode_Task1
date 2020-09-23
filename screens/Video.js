import React from 'react';
import {Text,View} from 'react-native';
import YouTube from 'react-native-youtube';
import {Card} from 'react-native-paper';

const Video =({navigation,route})=>{
    const videoId=route.params.videoId.id.videoId;
   console.log(route.params.videoId);
   const title= route.params.videoId.snippet.title;
   const description = route.params.videoId.snippet.description;
   
    return(<View>
         <YouTube
    apiKey="AIzaSyB2ecKMxwXrxonR9-R-LMpDEBVP67PqJJc"
    videoId= {videoId.toString()}// The YouTube video ID
    play={true}
    
   
    
    style={{ alignSelf: 'stretch', height: 300 }}
  /> 
  <Card> 
  <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold'}}>{title}</Text>
  <Text style={{textAlign:'center',fontSize:15,color:'grey'}}>{description}  </Text>
  </Card>



    </View>
    
  
  
  
  
 
      

      )
}

export default Video;