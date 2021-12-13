import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useDispatch } from "react-redux";
import InputField from "../../components/input-field";
import RecentButton from "../../components/RecentButton";
import { emailValidator } from "../../constants";
import UserModel from "../../model/user-model";
import styles from "./style";



const Login = ({ navigation }) => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const marginBottom = keyboardHeight !== 0 ? customHeight(100) : 0;
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();

    return (
        <SafeAreaView >
            <ScrollView>
                <View style={{ ...styles.container, marginBottom }}>
                    {
                        isLoading
                            ? (
                                <View style={styles.viewContainer}>
                                    <ActivityIndicator />
                                </View>
                            )
                            : null
                    }
                    <Text style={styles.mainTitle}>Login</Text>
                    <View style={styles.createAccountMotivationWords}>
                        <Text style={styles.loginWords}>Login with your account if not, </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("createAccount")}>
                            <Text style={styles.createAccountPort}>create account</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.fieldsContainer}>
                        <InputField onChangeText={text => setData({ ...data, email: text })} keyboardType="email-address" placeholder="Email" />
                        <View style={styles.minWideSpace} />
                        <InputField onChangeText={text => setData({ ...data, password: text })} secureTextEntry secureTextEntry={true} placeholder="Password" />
                    </View>
                    <View style={styles.submitBtnContainer}>
                        <RecentButton onPress={_ => performLogin(data, setLoading, dispatch, navigation)}
                            mainStyle={styles.loginBtn} text="Login" />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

// login submission execution
const performLogin =
    async (data, setLoading, dispatch, navigation) => {

        const email = data.email;
        const password = data.password;

        if (!password || password == "") return
        if (!email || email == "") return;
        if (emailValidator.test(data)) return alert("You provided an invalid email. Please check!");

        setLoading(true)
        const res = await UserModel.login(data);

        if (res.status !== 200) {
            setLoading(false);
            alert(res.message)
        };


    }

export default Login;