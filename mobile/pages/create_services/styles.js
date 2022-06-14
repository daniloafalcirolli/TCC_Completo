import { StyleSheet, Dimensions } from 'react-native';

import { mainColor } from '../../config';

let FONT_BACK_LABEL = 25;

if(Dimensions.get('window').width < 400){
    FONT_BACK_LABEL = 20;
}

const style = StyleSheet.create({

    container: {
        width: '95%',
        height: "95%",
        maxHeight: "95%",
        borderRadius: 10,
        paddingHorizontal: "5%",
        backgroundColor: mainColor,
    },
    containerWhite: {
        width: '95%',
        height: "95%",
        maxHeight: "95%",
        borderRadius: 10,
        paddingHorizontal: "5%",
        backgroundColor: "white",
    },
    btn: {
        marginVertical: 20,
    },
    itemView: {
        marginVertical: 20,
        width: "100%",
    },
    label:{
        width:"40%",
        color:mainColor,
        backgroundColor: "white",
        fontSize: FONT_BACK_LABEL,
        borderRadius: 10,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        paddingHorizontal: 10
    },
    defaultInput: {
        borderRadius: 10,
        fontSize: 25,
        padding: 8,
        borderTopLeftRadius: 0,
        backgroundColor: "white",
        width: "100%",
        color: "black"
    },

    FAS: {
        marginVertical: 20,
    },
    input2: {
        borderRadius: 10,
        width: "70%",
        textAlign: "center",
        backgroundColor: "white",
        padding: 5,
        height: "100%",
        fontSize: 24
    },

    clienteContainer: {
        backgroundColor: "rgba(0,0,0,0)",
        width: "80%",
        alignItems:"center",
        alignSelf:"center",
        marginBottom: 30,
    },
    clienteName: {
        fontSize: 20,
        backgroundColor: mainColor,
        color:"white",
        padding: 5,
        textAlign:"center",
        width: "70%", 
        alignItems: "center",
        borderRadius: 10,
        fontWeight: "bold",
    },
    clienteInfos: {
        paddingHorizontal: 20,
        zIndex: -1,
        backgroundColor: "white",
        width: "100%",
        alignItems: "center",
        paddingTop:30,
        paddingBottom:10,
        borderRadius: 20,
        marginTop: -20,
        borderWidth: 3,
        borderColor: mainColor
    }, 
    clienteInfo: {
        fontSize: 17,
        alignSelf: "flex-start",
        color: mainColor,
    },
    clienteTextInfo: {
        fontSize: 16,
        alignSelf: "flex-end",
        fontWeight: "bold",
        color: mainColor,
    },
    clientePesquisa: {
        borderWidth: 2,
        borderColor: mainColor,
        borderRadius: 10,
        width: "70%",
        alignSelf:'center',
        padding: 10,
        fontSize: 25,
    },

    provedorName: {
        fontSize: 30,
        backgroundColor: mainColor,
        color:"white",
        padding: 10,
        textAlign:"center",
        width: "70%", 
        alignItems: "center",
        borderRadius: 10,
        fontWeight: "bold",
    },

});

export { style };