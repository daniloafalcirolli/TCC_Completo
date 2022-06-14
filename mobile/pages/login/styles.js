import { StyleSheet } from 'react-native';


import { mainColor } from '../../config';

const styles = StyleSheet.create({
    banner: {
        height: "100%",
        width: "100%",
        backgroundColor: "#e6e6e6",
    },
    background:{
        height: "30%",
        width: "100%",
        backgroundColor: mainColor,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    card: {
        flex: 1,
        height: 10,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        backgroundColor: 'white',
        height: '100%',
        width: '88%',
        marginBottom: '50%',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: mainColor,
    },
    elements: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        paddingVertical: 25,
        paddingHorizontal: 25,
        justifyContent: "space-around"
    },
    h1: {
        color: mainColor,
        fontSize: 32,
        fontWeight: "700",
    },
    input: {
        borderWidth: 2,
        borderColor: mainColor,
        width: "100%",
        padding: 10,
        paddingLeft: 20,
        borderRadius: 30,
        fontSize: 25
    },
    button: {
        backgroundColor: mainColor,
        width: "100%",
        height: 50, 
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonTxT: {
        color: "#FFF",
        fontSize: 25,
        textAlign: "center",
    },



    msg: {
        backgroundColor: "#FFF",
        color: mainColor,
        fontSize: 25,
        padding: 10,
        marginTop: "5%",
        borderRadius: 10
    },
    i: {
        display:"none",
    },
    v:{
        display:"flex",
    }
});

export { styles };