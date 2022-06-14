import React, {useState, useEffect} from 'react';
import { View, ScrollView, TouchableOpacity, Text, TextInput, Modal} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faCirclePlus,
    faCircleChevronLeft,
    faCircleChevronRight,
    faCircleMinus
} from '@fortawesome/free-solid-svg-icons'

import { styles } from './styles';
import { GStyle } from "../global/styles"
import { baseURL, mainColor } from '../../config'


export default function Materials({navigation, route}) {

    const {id} = route.params;

    const [usados, setUsados] = useState([]);
    const [materiais, setMateriais] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [act, setAct] = useState(0);

    const [msg, setMsg] = useState({
        style: GStyle.i,
        err: ""
    })

    useEffect(async () => {
        let f = await fetch(`${baseURL}/api/material`);
        let r = await f.json();
        setMateriais(r)
    }, [])

    async function enfiarMaterialNoSistema(){

        let boolean = true;
        for(let a of usados){
            if(a.quantidade == undefined || a.quantidade == ""){
                boolean = false;
            }
        }

        if(boolean && JSON.stringify(usados) != '[]'){
            for(let a in usados){
                delete usados[a]["material"];
            }
            let settings = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usados)
            }

            const item = {
                "200": async () => {
                    setMsg({
                        style: GStyle.v,
                        err: "Em processo de finalização"
                    })
                    let f2 = await fetch(`${baseURL}/api/servico?id=${id}&status=finalizado`, {
                        method: "POST",
                        body: JSON.stringify({})
                    });
                    if(f2.status == 200){
                        setTimeout(()=>{
                            setMsg({
                                style: GStyle.i,
                                err: ""
                            })
                            navigation.navigate("Hub");
                        }, 2000)
                    }else{
                        setMsg({
                            style: GStyle.v,
                            err: "Houve um erro ao finalizar o serviço"
                        })
                    }
                },
                "400": () => {
                    setUsados([]);
                    setMsg({
                        style: GStyle.v,
                        err: "Não foi possivel finalizar o servico"
                    })
                    setTimeout(()=>{
                        setMsg({
                            style: GStyle.i,
                            err: ""
                        })
                    }, 2000)
                }
            }

            let f = await fetch(`${baseURL}/api/servico/materiais/${id}`, settings);
            item[`${f.status}`]();

        }else{
            setMsg({
                style: GStyle.v,
                err: "Não tem materiais para mandar para o sistema ou algum está sem quantidade"
            })
            setTimeout(()=>{
                setMsg({
                    style: GStyle.i,
                    err: ""
                })
            }, 2000)
        }

    }

    return (
        <View style={GStyle.pageView}>
            <Modal
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={GStyle.pageView}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={styles.elements}
                    >
                        {
                            materiais.map((e,index)=>{
                                return(
                                    <TouchableOpacity key={index} style={styles.modalMaterial} onPress={() => {
                                        let item = usados;
                                        item.push(e);
                                        setUsados(item);
                                        setModalVisible(!modalVisible);
                                    }}>
                                        <Text style={styles.modalMaterialText}>{e.material}</Text>
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </ScrollView>
                </View>
            </Modal>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.elements}
            >
                <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: "10%"}}>
                    <TouchableOpacity
                        style={{alignSelf:"center", marginBottom: 50}}
                        onPress={()=>{navigation.navigate("Service", route.params)}}
                    >
                        <FontAwesomeIcon icon={faCircleChevronLeft} size={ 50 } color={mainColor}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{alignSelf:"center", marginBottom: 50}}
                        onPress={()=>{setModalVisible(!modalVisible);}}
                    >
                        <FontAwesomeIcon icon={faCirclePlus} size={ 50 } color={mainColor}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{alignSelf:"center", marginBottom: 50}}
                        onPress={()=>{enfiarMaterialNoSistema()}}
                    >
                        <FontAwesomeIcon icon={faCircleChevronRight} size={ 50 } color={mainColor}/>
                    </TouchableOpacity>
                </View>
                <Text style={[msg.style, GStyle.whiteMsg]}>{msg.err}</Text>
                {
                    usados.map((e, index)=>{
                        return(
                            <View key={index} style={styles.usado}>
                                <TouchableOpacity
                                    style={{alignSelf:"center"}}
                                    onPress={()=>{
                                        let item = usados;
                                        item.splice(index, 1);
                                        setUsados(item);
                                        setAct(act+1);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faCircleMinus} size={ 50 } color={mainColor}/>
                                </TouchableOpacity>
                                <Text style={styles.usadoText}>{e.material}</Text>
                                <TextInput
                                    style={styles.usadoInput}
                                    onChangeText={(e)=>{
                                        let item = usados;
                                        item[index].quantidade = e;
                                        setUsados(item);
                                    }}
                                />
                            </View>
                        );
                    })
                }
            </ScrollView>
        </View>
    );

}