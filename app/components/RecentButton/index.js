import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import styles from "./style";

const RecentButton = props => {
    const mainStyle = {...styles.btnContainer, ...props.mainStyle,}; 
    const textStyle = {...styles.text, ...props.textStyle}
    return (
        <TouchableOpacity onPress={_=> props.onPress()} activeOpacity={0.8}>
            <View style={mainStyle}>
                <Text style={textStyle}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default RecentButton;
