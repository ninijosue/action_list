import { StyleSheet } from "react-native";
import { customHeight, customWidth } from "../../../helper/screenAdjuster";

export default StyleSheet.create({
    modelContainer: {
        backgroundColor: "rgba(0,0,0,0.5)",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modelContent: {
        backgroundColor: "#FFFFFF",
        width: customWidth(90),
        borderRadius: customWidth(2),
        padding: customWidth(4),
        justifyContent: "center",
    },
    modelHead: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    cancelBtn: {
       marginBottom: 20
    },
    space: {
        height: customHeight(2)
    },
    modelTitle: {
        fontSize: customHeight(2.4),
        fontWeight: "500",
        color: "#5063C5",
        textTransform: "capitalize",
        marginBottom: customHeight(3),
    },
    submitBtnRow: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "row",
    }
})