import React, { useState, useEffect } from 'react';
import { RefreshControl, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GStyle } from '../global/styles';
import { baseURL } from '../../config'
import { serviceStyle } from "../global/serviceStyle"

export default function Services({ navigation }){

    const [services, setServices] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    async function onRefresh(){
      setRefreshing(true);
      try{
          let item = await AsyncStorage.getItem('userdata');
          let f = await fetch(`${baseURL}/api/servico/funcionario?id=${JSON.parse(item).id}&status=em%20andamento`);
          let r = await f.json();
          setServices(r);
      }catch(err){
          console.log(err)
      }
      setTimeout(()=>{
          setRefreshing(false)
      } , 2000)
    }

    function individualService(id){
        navigation.navigate('Service', {
            "id": id
        });
    }

    function date_format(date){
        let d = date.split("T")[0];
        let date_reform = d.split("-");
        return `${date_reform[2]}/${date_reform[1]}/${date_reform[0]}`;
    }

    useEffect(async () => {
        let item = await AsyncStorage.getItem('userdata');
        let f = await fetch(`${baseURL}/api/servico/funcionario?id=${JSON.parse(item).id}&status=em%20andamento`);
        let r = await f.json();
        setServices(r);
    }, [])

    return(
        <View style={GStyle.pageView}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={serviceStyle.container}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
            >
                {
                        services == [] ? null : services.map((e, index)=>{
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
