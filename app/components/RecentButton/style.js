import { StyleSheet } from 'react-native';
import { customHeight, customWidth } from '../../helper/screenAdjuster';

export default StyleSheet.create({
    btnContainer: {
       backgroundColor: "#AA3838",
       paddingVertical: customHeight(2.5),
       paddingHorizontal: customWidth(3),
       margin: customWidth(1),
       justifyContent: "center",
       alignItems: "center",
       borderRadius: customWidth(1),
       
    },
    text: {
        fontSize: customWidth(4),
        color: "#FFFFFF",
        letterSpacing: customWidth(0.5)
    }
})