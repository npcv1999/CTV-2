import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/FontAwesome5";
export default function ButtonIcon({icon,color}) {
    return (
        <View style={[styles.container,{borderColor: color}]}>
            <Icon name={icon} size={30} color={color}></Icon>
        </View>
    )
}

const styles = StyleSheet.create({
    container:
{
    width:50,
    height:50,
    borderWidth:1,
    //borderColor:"#4d79ff",
    borderRadius:40,
    justifyContent:"center",
    alignItems:"center"
}
})

