import React, {useState, useEffect} from 'react';
import { View, ScrollView, TouchableOpacity, TextInput, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faGasPump,
    faCar,
} from '@fortawesome/free-solid-svg-icons'

import { style } from './styles';
import { GStyle } from "../global/styles";
import { baseURL, mainColor } from '../../config';

export default function Funcionario({navigation}){

    const [user, setUser] = useState({});

    useEffect(async ()=>{
        setUser(JSON.parse(await AsyncStorage.getItem('userdata')));
    }, [])

    return(
        <View style={GStyle.pageView}>
            <ScrollView 
                showsVerticalScrollIndicator={false}
                style={style.container}
            >
                <View style={style.imgView}>
                    <Image style={style.img} source={{uri: `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png`}}></Image>
                </View> 
                <View style={style.cont}>
                    <View style={style.infoContainer}>
                        <Text style={style.typeInfo}>Nome</Text>
                        <View style={GStyle.line}></View>
                        <Text style={style.info}>{`${user.primeiro_nome} ${user.ultimo_nome}`}</Text>
                    </View>
                    <View style={GStyle.line}></View>
                    <View style={style.infoContainer}>
                        <Text style={style.typeInfo}>RG</Text>
                        <View style={GStyle.line}></View>
                        <Text style={style.info}>{user.rg}</Text>
                    </View>
                    <View style={GStyle.line}></View>
                    <View style={style.infoContainer}>
                        <Text style={style.typeInfo}>Endereço</Text>
                        <View style={GStyle.line}></View>
                        <Text style={style.info}>{user.endereco || "endereço qualquer que achei por ai endereço qualquer que achei por ai"}</Text>
                    </View>
                    <View style={GStyle.line}></View>
                    <View style={style.infoContainer}>
                        <Text style={style.typeInfo}>Telefone</Text>
                        <View style={GStyle.line}></View>
                        <Text style={style.info}>{user.telefone}</Text>
                    </View>
                    <View style={[GStyle.fontAwesomeSomething, style.infoContainerIcon]}>
                        <FontAwesomeIcon icon={faGasPump} size={ 50 } color="white"/>
                        <Text style={style.infoIcon}>{user.kilometragem_por_litro}</Text>
                    </View>
                    <View style={[GStyle.fontAwesomeSomething, style.infoContainerIcon]}>
                        <FontAwesomeIcon icon={faCar} size={ 50 } color="white"/>
                        <Text style={style.infoIcon}>{user.placa}</Text>
                    </View>
                    <View style={GStyle.line}></View>
                    <TouchableOpacity style={[GStyle.whiteBtn, GStyle.btn]} onPress={()=>navigation.navigate("ListServicesStatus")}>
                        <Text style={GStyle.whiteBtnText}>Serviços finalizados/quebrados</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}