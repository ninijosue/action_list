import { StyleSheet } from 'react-native';
import { customHeight, customWidth } from '../../helper/screenAdjuster';

export default StyleSheet.create({
    container: {
        height: "100%",
        padding: customWidth(5),
        marginTop: customHeight(6),
    },
    viewContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    createAccountMotivationWords: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: customHeight(4)
    },
    mainTitle: {
        fontSize: customWidth(8),
        marginBottom: customHeight(4)
    },
    logupWords: {
        color: "#9C9C9C",
        fontSize: customWidth(3.2)
    },
    fieldsContainer: {
        width: "100%",
        marginTop: customHeight(3)
    },
    minWideSpace: {
        height: customHeight(2)
    },
    logupBtn: {
        width: customWidth(30)
    },
    submitBtnContainer: {
        alignItems: "flex-end",
        marginTop: customHeight(6)
    }
})