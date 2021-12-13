import { StyleSheet } from "react-native";
import { customHeight, customWidth } from "../../helper/screenAdjuster";

export default StyleSheet.create({
    headerContainer: {
        height: customHeight(9),
        backgroundColor: "#ffffff",
        shadowOffset: {
            width: 100,
            height: 100
        },
        shadowOpacity: 1,
        elevation: 6,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: customWidth(3),

    },
    headerText: {
        fontSize: customHeight(2.8),
        fontWeight: "normal",
        color: "#015889",
    },
    signOutBtn: {
        backgroundColor: "#594573",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: customHeight(1.7),
        paddingHorizontal: customWidth(3.8),

    },
    signOutText: {
        fontSize: customHeight(1.8),
        letterSpacing: customWidth(0.3),
        fontWeight: "normal",
        color: "#ffffff",
    }
})