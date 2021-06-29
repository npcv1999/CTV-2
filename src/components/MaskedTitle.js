import MaskedView from '@react-native-community/masked-view';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

 const MaskedTitle = props =>  {
    return (
        <MaskedView
            maskElement={
                <Text {...props}></Text>
            }
        >
            <LinearGradient
            colors={['#48c6ef','#6f86d6']}
            start={{x:0, y:0}}
            end={{x:0,  y:1}}  
            style={styles.gradient}  
            >
            <Text {...props} style={[props.style,{opacity:0}]}></Text>
            </LinearGradient>
        </MaskedView>
        
    );
}
export default MaskedTitle;
const styles = StyleSheet.create({})
