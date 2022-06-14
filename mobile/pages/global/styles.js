import {StyleSheet} from "react-native";

import { mainColor } from '../../config';

const GStyle = StyleSheet.create({
    pageView: {
        flex: 1,
        alignItems:"center",
        justifyContent: "center",
        backgroundColor: "rgb(242, 242, 245);"
    },

    line: {
        height: 4,
        width: "100%",
        backgroundColor: mainColor,
    },

    btn:{
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        fontSize: 30,
    },

    defaultcolorBtn: {
        backgroundColor: mainColor,
    },
    defaultcolorBtnText: {
        color: 'rgba(255,255,255,1)',
        textAlign: "center",
        fontSize: 30,
        width:"100%",
    },

    whiteBtn: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: 'rgba(255,255,255,1)',
    },
    whiteBtnText: {
        color: mainColor,
        textAlign: "center",
        fontSize: 30,
    },

    blankBtn:{
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#000",
    },
    blankBtnText:{
        color:"black",
        textAlign: "center",
        width:"100%",
        fontSize: 30,
    },

    fontAwesomeSomething: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    whiteMsg: {
        backgroundColor: "#FFF",
        color: mainColor,
        fontSize: 25,
        padding: 10,
        textAlign: "center",
        borderRadius: 10,
    },
    i: {
        opacity: 0,
        display:"none"
    },
    v:{
        opacity: 1,
        display:"flex"
    },
})

export { GStyle };