import { StyleSheet } from 'react-native';

import { mainColor } from '../../config';

const style = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        width: '95%',
        maxHeight: "95%",
        borderRadius: 10,
    },
    cont: {
        backgroundColor: mainColor,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10,
    },

    imgView: {
        marginBottom: "-5%",
        marginTop: "10%",
        zIndex: 2,
        alignItems:"center",
        position: "relative",
    },
    img: {
        borderRadius: 10,
        width: 130,
        height: 130,
        borderWidth: 5,
        borderColor:mainColor,
    },

    infoContainer: {
        marginVertical: "5%",
        width:"100%",
    },
    typeInfo: {
        color: mainColor,
        backgroundColor: "white",
        fontSize: 20,
        padding: 5,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    info:{
        backgroundColor: "white",
        width:"100%",
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        padding: 8,
        fontSize: 19
    },

    infoContainerIcon: {
        marginVertical: "5%",
        justifyContent: "space-around"
    },

    infoIcon:{
        minWidth:"55%",
        height: "100%",
        fontSize: 20,
        paddingVertical: 10,
        paddingHorizontal: '10%',
        backgroundColor: "white",
        borderRadius: 10,
    },
});

export { style };