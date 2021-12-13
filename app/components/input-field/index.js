import React from 'react'
import { TextInput } from 'react-native';
import styles from "./style";

const InputField = props=>{
    const initializedProps = {...props};
    delete initializedProps.style;
    const allStyles = {...props.style, ...styles.field}; 
    return <TextInput {...initializedProps} style={allStyles}  />
}

export default InputField;