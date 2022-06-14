import { StyleSheet } from 'react-native';

import { mainColor } from '../../config';

const style = StyleSheet.create({
    someView: {
        alignSelf:"center",
        width: '80%',
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems:"center",
        marginBottom: "10%"
    },
    pickerView:{
        width: '70%',
        height: '100%',
        backgroundColor: mainColor,
        overflow:"hidden",
        borderRadius: 10
    },
});

export { style };