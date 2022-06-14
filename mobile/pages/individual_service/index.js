import React, { useState, useEffect } from 'react';
import { Modal, Text, TouchableOpacity, View, ScrollView, TextInput, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faCircleChevronLeft as backLeft,
    faCircleChevronRight as backRight,
} from '@fortawesome/free-solid-svg-icons';

import { GStyle } from "../global/styles";
import { style } from './styles';

import { baseURL, googleApi, mainColor } from '../../config';

export default function Services({ navigation, route }){
    const {id} = route.params;
    
    const [service, setService] = useState([]);
    const [provedor, setProvedor] = useState({});
    const [servicoProvedor, setServicoProvedor] = useState({})
    const [cliente, setCliente] = useState({});

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);

    const [obs, setObs] = useState("");
    const [codB, setCodB] = useState("");
    const [msg, setMsg] = useState({
        style: GStyle.i,
        msg: ""
    });

    const [currentLocation, setCurrentLocation] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    });
    const [disabled, setDisabled] = useState(true);

    useEffect(async () => {

        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert("É necessario aceitar a permissão para fazer uso do mapa que o leva-ra para o seu serviço")
          return;
        }
        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
        setCurrentLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        })

        let f = await fetch(`${baseURL}/api/servico/${id}`);
        let r = await f.json();
        setService(r);
        setCliente(r.cliente);
        setProvedor(r.provedor)
        setServicoProvedor(r.servicoProvedor)
        setDisabled(false)
    }, [])

    function date_format(date){
        if(date!=undefined){
            let d = date.split("T")[0];
            let date_reform = d.split("-");
            return (`${date_reform[2]}/${date_reform[1]}/${date_reform[0]}`);
        }
    }

    async function breakservice(){
        if(obs == ""){
            setMsg({
                style: GStyle.v,
                msg: "Preencha todos os campos"
            })
            setTimeout(()=>setMsg({
                style: GStyle.i,
                msg: ""
            }),3000)
            return
        }

        let link = `${baseURL}/api/servico?id=${id}&status=quebra`;
        const body = JSON.stringify({
            obs: obs,
            cod: codB
        })

        let settings = {
            "method": "POST",
            "headers": {
                "content-type": "application/json"
            },
            body: body
        }

        let f = await fetch(link, settings);

        let act = {
            "200": () => {
                setModalVisible(!modalVisible)
                navigation.navigate("Hub")
            },
            "400": () => {
                setMsg({
                    style: GStyle.v,
                    msg: "Erro ao quebrar o servciço"
                })
            },
            "404": () => {
                setMsg({
                    style: GStyle.v,
                    msg: "Serviço não encontrado"
                })
            },
        }

        act[`${f.status}`]()
        setTimeout(()=>setMsg({
            style: GStyle.i,
            msg: ""
        }),2000)
    }

    return(
        <View style={GStyle.pageView}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {setModalVisible(false)}}
                >
                    <View style={style.modal}>
                        <Text style={[GStyle.whiteMsg, style.modalMsg, msg.style]}>{msg.msg}</Text>
                        <View style={style.modalView}>
                            <Text style={style.modalText}>
                                Encerrar serviço como quebra?
                            </Text>
                            <Text style={[style.modalText, style.modalLabel]}>Observação</Text>
                            <TextInput multiline numberOfLines={2} placeholder="Obs." value={obs} onChangeText={(e)=>setObs(e)}  style={style.modalInput}/>
                            <Text style={[style.modalText, style.modalLabel]}>Codigo da quebra</Text>
                            <TextInput placeholder="Cod." style={style.modalInput} value={codB} onChangeText={(e)=>setCodB(e)}/>
                            <TouchableOpacity style={[GStyle.btn, GStyle.blankBtn, style.btnSize, style.btnModal1]} onPress={() => {setModalVisible(!modalVisible);}}>
                                <Text style={GStyle.blankBtnText}>Voltar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[GStyle.btn, GStyle.defaultcolorBtn, style.btnSize]}>
                                <Text style={GStyle.defaultcolorBtnText} onPress={() => {breakservice()}}>Quebra</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible2}
                    onRequestClose={() => {setModalVisible2(false)}}
                >
                    <View style={style.modal2}>
                        <View style={style.modal2View}>
                            <TouchableOpacity style={style.backMap} onPress={()=>setModalVisible2(false)}>
                                <FontAwesomeIcon icon={backLeft} size={ 50 } color={mainColor} secondaryColor="red" secondaryOpacity={ 1 }/>
                            </TouchableOpacity>
                            <MapView
                                style={style.modalMap}
                                initialRegion={currentLocation}
                            >
                                <MapViewDirections 
                                    origin={currentLocation}
                                    destination={{
                                        latitude: Number(cliente.latitude),
                                        longitude: Number(cliente.longitude)
                                    }}
                                    strokeWidth={5}
                                    strokeColor={"red"}
                                    apikey={googleApi}
                                />
                                <Marker 
                                    coordinate={{
                                        latitude: currentLocation.latitude,
                                        longitude: currentLocation.longitude
                                    }}
                                />
                                <Marker 
                                    coordinate={{
                                        latitude: Number(cliente.latitude),
                                        longitude: Number(cliente.longitude)
                                    }}
                                />
                            </MapView>
                        </View>
                    </View>
                </Modal>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={style.container}
                >
                    <View style={style.elements}>

                        <View style={{flexDirection: "row", alignItems:"center",justifyContent: "space-between", width: "95%"}}>
                            <TouchableOpacity style={style.btn_backpass} onPress={()=>navigation.navigate("Hub")}>
                                <FontAwesomeIcon icon={backLeft} size={ 50 } color={mainColor}/>
                            </TouchableOpacity>
                        </View>

                        <Text style={style.info}>
                            Status:
                        </Text>
                        <Text style={style.textInfo}>
                            {service.status}
                        </Text>

                        <View style={[GStyle.line, style.lineMargin]}></View>

                        <Text style={style.info}>
                            Cliente:
                        </Text>
                        <Text style={style.textInfo}>
                            {cliente.nome}
                        </Text>

                        <Text style={style.info}>
                            Endereço:
                        </Text>
                        <Text style={style.textInfo}>
                            {cliente.endereco}
                        </Text>

                        <Text style={style.info}>
                            Finalização prevista:
                        </Text>
                        <Text style={style.textInfo}>
                            {date_format(service.data_finalizacao)}
                        </Text>

                        <View style={[GStyle.line, style.lineMargin]}></View>

                        <Text style={style.info}>
                            Contrato:
                        </Text>
                        <Text style={style.textInfo}>
                            {service.contrato}
                        </Text>

                        <Text style={style.info}>
                            Protocolo:
                        </Text>
                        <Text style={style.textInfo}>
                            {service.protocolo}
                        </Text>

                        <Text style={style.info}>
                            Provedor:
                        </Text>
                        <Text style={style.textInfo}>
                            {provedor.name}
                        </Text>

                        <Text style={style.info}>
                            Servico:
                        </Text>
                        <Text style={style.textInfo}>
                            {servicoProvedor.servico}
                        </Text>

                        <TouchableOpacity style={[GStyle.btn, GStyle.defaultcolorBtn, style.btnSize, style.btnBreakMargin]} disabled={disabled} onPress={()=>setModalVisible(true)}>
                            <Text style={GStyle.defaultcolorBtnText}>Quebra</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[GStyle.btn, GStyle.defaultcolorBtn, style.btnSize, style.btnGoToMargin]} disabled={disabled} onPress={()=>setModalVisible2(true)}>
                            <Text style={GStyle.defaultcolorBtnText}>Ir para</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={[GStyle.btn, GStyle.defaultcolorBtn, style.btnSize, style.btnFinalizar]} disabled={disabled} onPress={()=>{navigation.navigate("Materials", {id:id})}}>
                            <Text style={GStyle.defaultcolorBtnText}>Finalizar</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
        </View>
    )
}
