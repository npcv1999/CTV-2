import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native';
export default class ViewBtn extends React.Component {
    render(){
        const {btn}= this.props;
    // const navigation = useNavigation(); 
    return (
        <View 
        style={styles.container}
        // onPress={()=>navigation.navigate("Regist")}
        >
            <LinearGradient
            colors={['#48c6ef','#6f86d6']}
            start={{x:0, y:0}}
            end={{x:0,  y:1}}  
            style={styles.gradient}    
            >
                <Text style={styles.text}>
                    {btn}
                </Text>
            </LinearGradient>
        </View>
        );
    }
}
 const styles=StyleSheet.create({
     text:{
         fontSize:17,
         fontWeight:"bold",
         color:"#fff",
        
     },
     gradient:{
         //padding:1,
         paddingVertical:25,
         borderRadius:15,
         marginVertical:"4%",
         paddingHorizontal:"10%",
         height:"20%",
         alignItems:"center",
         justifyContent:"center"
     },
     container:{
         margin:30,
         alignItems:"center"
     }

 })

