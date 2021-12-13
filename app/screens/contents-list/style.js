import { StyleSheet } from "react-native";
import { customHeight, customWidth } from "../../helper/screenAdjuster";

export default StyleSheet.create({
    mainContainer: {
        paddingHorizontal: customWidth(4),
        paddingTop: customHeight(4),
        height: customHeight(90.4),
        paddingHorizontal: customWidth(7)
    },
    mainItemsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    contentTitle: {
        fontSize: customHeight(2.4),
        fontWeight: "500",
        color: "#5063C5",
        textTransform: "capitalize",
        paddingBottom: customHeight(1.5),
    },
    mainHistory: {
        fontSize: customHeight(1.8),
        fontWeight: "400",
        color: "#000000",
        lineHeight: customHeight(3),
        paddingLeft: customWidth(2),
        letterSpacing: customWidth(0.2),
        opacity: 0.7
    },
    bottomContentBarSeparator:{
        height: customHeight(0.1),
        backgroundColor: "#000000",
        opacity: 0.14,
        marginVertical: customHeight(3.5)
    },
    floatingBtnContainer: {
        width: customWidth(15),
        height: customWidth(15),
        borderRadius: customWidth(30),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: customHeight(5.6),
        right: customWidth(8)
    }
})