import { StyleSheet } from 'react-native';

import { mainColor } from '../../config';

const serviceStyle = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        width: '95%',
        maxHeight: "95%",
        borderRadius: 10,
        paddingVertical: 20,
    },
    containerService: {
        backgroundColor: "rgba(0,0,0,0)",
        width: "80%",
        alignItems:"center",
        alignSelf:"center",
        marginBottom: 30,
    },
    clientService: {
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
    serviceInfos: {
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
    info: {
        fontSize: 17,
        alignSelf: "flex-start",
        color: mainColor,
    },
    textInfo: {
        fontSize: 16,
        alignSelf: "flex-end",
        fontWeight: "bold",
        color: mainColor,
    },
    lineMargin: {
        marginVertical: 5,
        height: 2
    }
    
});

export { serviceStyle };