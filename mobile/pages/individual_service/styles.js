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

    btn_backpass: {
        alignSelf:"center",
        backgroundColor: 'rgba(0,0,0,0)',
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

    btnSize: {
        width: "70%",
    },
    btnBreakMargin:{
        marginTop: "10%"
    },
    btnGoToMargin:{
        marginTop: "5%"
    },
    btnFinalizar: {
        marginTop: "5%"
    },
    

    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e7e7e7"
    },
    modalView :{
        width : "90%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 20,
        alignItems: "center",
    },
    modalText: {
        color: "black",
        fontSize: 30,
    },
    modalLabel: {
        fontSize: 20,
        textAlign: "left",
        alignSelf: "flex-start",
        marginTop: 20,
        marginBottom: 5,
    },
    modalInput: {
        backgroundColor: "#e7e7e7",
        fontSize: 20,
        width: "100%",
        padding: 10,
        maxHeight: 300,
    },
    btnModal1: {
        marginTop: '10%',
        marginBottom: '5%'
    },
    modalMsg: {
        width: "80%",
        marginTop: "10%",
        position:"absolute",
        top: 0,
    },

    modal2:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    modal2View :{
        position: "relative",
        width : "95%",
        height: "95%",
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
        overflow: "hidden",
    },
    modalMap:{
        width: "100%",
        height: "100%",
        borderRadius: 10
    },
    backMap: {
        zIndex: 100,
        width: 50,
        height: 50,
        backgroundColor: "black",
        position: 'absolute',
        alignSelf: "flex-end",
        alignItems: "center",
        justifyContent: "center",
        top: "2%",
        right: "5%",
        borderRadius: 30
    }
});

export { style };