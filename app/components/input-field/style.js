import { StyleSheet } from 'react-native';
import { customHeight, customWidth } from '../../helper/screenAdjuster';

export default StyleSheet.create({
    field: {
        backgroundColor: "#FFFFFF",
        height: customHeight(10),
        marginVertical: customHeight(0.3),
        borderRadius: customWidth(2),
        elevation: 3,
        paddingHorizontal: customWidth(3)
    }
})