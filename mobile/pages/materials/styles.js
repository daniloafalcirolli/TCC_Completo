import { StyleSheet } from 'react-native';

import { mainColor } from '../../config'

const styles = StyleSheet.create({
    elements: {
        paddingVertical: 20,
        width: "95%",
        maxHeight: "95%",
        borderRadius: 10,
        backgroundColor: "white"
    },
    modalMaterial: {
        width: "80%",
        borderWidth: 2,
        borderColor: mainColor,
        borderRadius: 10,
        alignSelf:"center",
        marginVertical: 20,
        padding: 10,
    },
    modalMaterialText:{
        fontSize: 25,
        color: mainColor,
        textAlign: "center",
    },
    usado: {
        flexDirection:"row",
        justifyContent: "space-around",
        alignItems: "center",
        marginVertical: 20,
    },
    usadoText:{
        width: "40%",
        fontSize: 20,
        color: mainColor
    },
    usadoInput: {
        width: "20%",
        fontSize:30,
        borderWidth: 2,
        borderColor: mainColor,
        borderRadius: 10,
        textAlign: "center",
        paddingHorizontal: 10,
    }
});

export { styles };