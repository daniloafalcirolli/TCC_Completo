import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, ScrollView, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faCircleChevronLeft,
} from '@fortawesome/free-solid-svg-icons'

import { style } from './styles';
import { GStyle } from '../global/styles';
import { baseURL, mainColor } from '../../config'

export default function ListServicesStatus({ navigation, route }){
    const {id, status} = route.params;
    const [service, setService] = useState({});
    const [cliente, setCliente] = useState({});
    const [materiais, setMateriais] = useState([]);

    function changePage(){
        navigation.navigate("ListServicesStatus");
    }

    useEffect(async () => {
        let f = await fetch(`${baseURL}/api/servico/${id}`);
        let r = await f.json();
        setService(r);
        setCliente(r.cliente);
        setMateriais(r.materiais);
    }, [])

    function date_format(date){
        if(date!=undefined){
            let d = date.split("T")[0];
            let date_reform = d.split("-");
            return (`${date_reform[2]}/${date_reform[1]}/${date_reform[0]}`);
        }
    }

    function  finalizado(){
        return (
            <View style={style.material}>
                <Text style={style.materialText}>
                    Materiais
                </Text>
                <View style={style.materialContainer}>
                    {
                        materiais.map((e,index)=>{
                            return (
                                <Text key={index} style={style.materialTextInfo}>
                                    {e.material}
                                </Text>
                            );
                        })
                    }
                </View>
            </View>
        );
    }

    return(
        <View style={GStyle.pageView}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={style.container}
                >
                    <View style={style.elements}>

                        <View style={{flexDirection: "row", alignItems:"center",justifyContent: "space-between", width: "95%"}}>
                            <TouchableOpacity style={style.btn_back} onPress={()=>changePage()}>
                                <FontAwesomeIcon icon={faCircleChevronLeft} size={ 50 } color={mainColor} secondaryColor="red" secondaryOpacity={ 1 }/>
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

                        <View style={[GStyle.line, style.lineMargin, status != 1 ? {marginBottom: 0} : null]}></View>

                        {
                            status == 1 ?
                            <View style={{width: "100%"}}>
                                <Text style={style.info}>
                                    Cod. Quebra:
                                </Text>
                                <Text style={style.textInfo}>
                                    {service.cod_quebra}
                                </Text>
                                <Text style={style.info}>
                                    Observação:
                                </Text>
                                <Text style={style.textInfo}>
                                    {service.observacoes}
                                </Text>
                            </View>
                            :
                            finalizado()
                        }

                    </View>

                </ScrollView>
        </View>
    )
}