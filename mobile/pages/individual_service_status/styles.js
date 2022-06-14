import { StyleSheet } from 'react-native';

import { mainColor } from '../../config';

const style = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '95%',
        maxHeight: "95%",
        borderRadius: 10,
    },
    elements: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 10,
    },

    btn_back: {
        alignSelf:"center",
        backgroundColor: 'rgba(0,0,0,0)',
        alignItems: "flex-start",
        justifyContent: "center",
        alignSelf:"flex-start",
        marginBottom: "15%",
    },

    info: {
        marginTop: 20,
        alignSelf: "flex-start",
        color: "black",
        fontSize: 20,
    },
    textInfo: {
        marginBottom: 20,
        alignSelf: "flex-end",
        color: "black",
        fontSize: 20,
    },
    lineMargin: {
        marginVertical: 10
    },

    material: {
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        padding: 20,
        width: "100%",
        backgroundColor:mainColor
    },
    materialContainer: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor:"white",
        padding: 10,
    },
    materialText: {
        color:mainColor,
        backgroundColor: "white",
        padding: 5,
        paddingHorizontal: 10,
        fontSize: 25,
        borderTopLeftRadius: 10,
        alignSelf: "flex-start",
        borderTopRightRadius: 10,
    },
    materialTextInfo: {
        color: mainColor,
        fontSize:20,
    }

});

export { style };