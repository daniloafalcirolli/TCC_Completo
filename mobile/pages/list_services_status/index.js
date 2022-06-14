import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faCircleChevronLeft,
} from '@fortawesome/free-solid-svg-icons'

import { style } from './style';
import {GStyle} from "../global/styles";
import { baseURL, mainColor } from '../../config';
import { serviceStyle } from "../global/serviceStyle"

export default function ListServicesStatus({ navigation }){

    const [services, setServices] = useState([]);
    const [status, setStatus] = useState("1");

    function individualService(id){
        navigation.navigate('ServiceStatus', {
            "id": id,
            "status": status,
        });
    }

    function date_format(date){
        let d = date.split("T")[0];
        let date_reform = d.split("-");
        return `${date_reform[2]}/${date_reform[1]}/${date_reform[0]}`;
    }

    useEffect(async () => {
        let item = JSON.parse(await AsyncStorage.getItem('userdata'));
        let f = await fetch(`${baseURL}/api/servico/funcionario?id=${item.id}&status=${(status == 1 ? "quebra" : "finalizado")}`);
        let r = await f.json();
        setServices(r)
    }, [status])

    return(
        <View style={GStyle.pageView}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={serviceStyle.container}
            >
                <View style={style.someView}>
                    <TouchableOpacity style={style.btn_back} onPress={()=>navigation.navigate('Hub')}>
                        <FontAwesomeIcon icon={faCircleChevronLeft} size={ 50 } color={mainColor} secondaryColor="red" secondaryOpacity={ 1 }/>
                    </TouchableOpacity>
                    <View style={style.pickerView}>
                        <Picker selectedValue={status} style={{width: "100%", alignSelf: "center", color: "white"}} onValueChange={(e)=>{setStatus(e)}}>
                            <Picker.Item value={1} selected label={"Quebrado"} />
                            <Picker.Item value={2} label={"Finalizado"} />
                        </Picker>
                    </View>
                </View>
                {
                    services == []
                    ?
                    null
                    :
                    services.map((e, index)=>{
                        return (
                            <TouchableOpacity style={serviceStyle.containerService} key={index} onPress={()=>individualService(e.id)}>
                                <Text style={serviceStyle.clientService}>
                                    {e.cliente.nome}
                                </Text>
                                <View style={serviceStyle.serviceInfos}>
                                    <Text style={serviceStyle.info}>
                                        Endereço:
                                    </Text>
                                    <Text style={serviceStyle.textInfo}>
                                        {e.cliente.endereco}
                                    </Text>
                                    <View style={[GStyle.line, serviceStyle.lineMargin]}></View>
                                    <Text style={serviceStyle.info}>
                                        Finalização prevista:
                                    </Text>
                                    <Text style={serviceStyle.textInfo}>
                                        {date_format(e.data_finalizacao)}
                                    </Text>
                                    <View style={[GStyle.line, serviceStyle.lineMargin]}></View>
                                    <Text style={serviceStyle.info}>
                                        Status:
                                    </Text>
                                    <Text style={serviceStyle.textInfo}>
                                        {e.status}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })
                }
            </ScrollView>
        </View>
    )
}
