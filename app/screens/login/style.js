import { StyleSheet } from 'react-native';
import { customHeight, customWidth } from '../../helper/screenAdjuster';

export default StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        padding: customWidth(5),
        marginTop: customHeight(15),
    },
    mainTitle: {
        fontSize: customWidth(8),
        marginBottom: customHeight(4)
    },

    viewContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    createAccountMotivationWords: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: customHeight(6)
    },
    loginWords: {
        color: "#9C9C9C",
        fontSize: customWidth(3.2)
    },
    createAccountPort: {
        color: "#3A95D7",
        fontSize: customWidth(3.2),
        marginLeft: customWidth(1),
        textTransform: "capitalize"
    },
    fieldsContainer: {
        width: "100%",
        marginTop: customHeight(3)
    },
    minWideSpace: {
        height: customHeight(2)
    },
    loginBtn: {
        width: customWidth(30)
    },
    submitBtnContainer: {
        alignItems: "flex-end",
        marginTop: customHeight(5)
    }
})