import * as React from 'react';
import { View, Text, Pressable, Touchable, TouchableOpacity } from 'react-native';
import styles from "./style";
import auth from "@react-native-firebase/auth";
import { useSelector } from 'react-redux';



const Header = (navigation)=>{
    const user = useSelector(state => state.user);

    return(
        <View style={styles.headerContainer}>
        <Text style={styles.headerText} >{user.displayName? `${user.displayName}'s list`: ""} </Text>
        <TouchableOpacity onPress={() => {auth().signOut()}} style={styles.signOutBtn}>
            <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
    </View>
    )
}

export default Header;