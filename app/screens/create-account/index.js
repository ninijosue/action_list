import React, { useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import InputField from "../../components/input-field";
import RecentButton from "../../components/RecentButton";
import { emailValidator } from "../../constants";
import styles from "./style";
import { useDispatch } from "react-redux";
import UserModel from "../../model/user-model";



const CreateAccount = () => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const marginBottom = keyboardHeight !== 0 ? customHeight(100) : 0;
    const [data, setData] = useState({});
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();

    return (
        <SafeAreaView>
            <ScrollView >
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
                    <Text style={styles.mainTitle}>Create account</Text>
                    <View style={styles.createAccountMotivationWords}>
                        <Text style={styles.logupWords}>Join the community </Text>
                    </View>
                    <View style={styles.fieldsContainer}>
                        <InputField onChangeText={(text) => setValue("email", text, data, setData)} keyboardType="email-address" placeholder="Email" />
                        <View style={styles.minWideSpace} />
                        <InputField onChangeText={(text) => setValue("names", text, data, setData)} placeholder="names" />
                        <View style={styles.minWideSpace} />
                        <InputField onChangeText={text => setValue("password", text, data, setData)} secureTextEntry={true} placeholder="Password" />
                        <View style={styles.minWideSpace} />
                        <InputField onChangeText={text => setValue("confirmPassword", text, data, setData)} secureTextEntry={true} placeholder="Confirm password" />
                    </View>
                    <View style={styles.submitBtnContainer}>
                        <RecentButton onPress={() => performSubmission(data, isLoading, setLoading, dispatch)} mainStyle={styles.logupBtn} text="Sign up" />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

// setting values of inputs
const setValue = (key, value, data, setData) => {
    switch (key) {
        case "email":
            setData({ ...data, email: value });
            break;
        case "password":

            setData({ ...data, password: value });
            break;
        default:
            setData({ ...data, [key]: value });
            break;
    }
}

// create account
const performSubmission =
    async (data, isLoading, setLoading, dispatch) => {
        if (isLoading) return;
        const email = data.email;
        const password = data.password;
        const confirmPassword = data.confirmPassword;
        const isValidEmail = emailValidator.test(email);
        if (!isValidEmail) return alert("The provided email is not valid. Please check!");

        if (password.length < 6) return alert("Password must be at least 6 characters long");
        if (password !== confirmPassword) return alert("Passwords do not match");
        delete data.confirmPassword;

        setLoading(true)
        const res = await UserModel.createAccount(data);
        if (res.status !== 200) {
            setLoading(false);
            alert(res.message)
        };
    }

export default CreateAccount;