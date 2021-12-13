
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export default class UserModel {


    /**
 * @param {{
     *  email: string 
     *  password: string,
     *  username: string
     * }} data
     * @returns {Promise<{
     *  status: string,
     *  message?: string
     * }>}
     */
    static async createAccount(data) {
        try {

            const foundSnap = await firestore().collection("users")
                .where("email", "==", data.email).get();
            if (!foundSnap.empty) return {
                status: 500,
                message: "Email already exist."
            };

            const credentials = await auth().createUserWithEmailAndPassword(data.email, data.password);
            if (!credentials) throw new Error("user creation failed!");
            await credentials.user.updateProfile({
                displayName: data.names,
                photoURL: ""
            })
            const uid = credentials.user.uid;
            const fireData = { ...data };
            delete fireData.password;
            // creating user document by user ID
            await firestore().doc(`users/${uid}`).set(fireData, { merge: true });

            return {
                status: 200,
                message: "User created successfully.",
                user: credentials.user
            }
        } catch (error) {
            return {
                status: 500,
                message: "User creation failed! Please check your email or password."
            }
        }
    }

    /**
 * @param {{
     * email: string, 
     * password: string
     * }} data
     * @returns {Promise<{
     * status: number,
     * message?: string
     * }>}
     */
    static async login(data) {
        try {
            const credentials = await auth().signInWithEmailAndPassword(data.email, data.password);
            return {
                status: 200,
                message: "Logged in successfully",
                user: credentials.user
            }
        } catch (error) {
            return {
                status: 500,
                message: "Login failed! Please check your email or password."
            }
        }
    }

}