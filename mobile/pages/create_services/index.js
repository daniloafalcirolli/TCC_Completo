import React, { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-modern-datepicker';
import { View, ScrollView, TouchableOpacity, TextInput, Text, Modal, KeyboardAvoidingView, ToastAndroid, RefreshControl } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
    faCalendarCheck,
    faCirclePlus,
    faCircleChevronLeft,
    faUserPlus,
    faUser
} from '@fortawesome/free-solid-svg-icons';

import { GStyle } from "../global/styles"
import { style } from './styles';
import { baseURL, googleApi, mainColor } from '../../config';

export default function Funcionario({navigator}){

    useEffect(async ()=>{
        let f = await fetch(`${baseURL}/api/cliente`);
        let r = await f.json();
        setClientes(r);
        setShowClientes(r);

        let f2 = await fetch(`${baseURL}/api/provedor`);
        let r2 = await f2.json();
        setProvedores(r2);
        setShowProvedores(r2);
    },[])

    
    function date_formater(a){
        let b = a.split("/");
        return `${b[2]}-${b[1]}-${b[0]}`;
    }

    function currentDate(){
        let date = new Date();
        return `${date.getFullYear()}-${(date.getMonth()+1) < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1}-${(date.getDate()) < 10 ? `0${date.getDate()}` : date.getDate()}`;
    }

    const [cliente, setCliente] = useState({});
    const [date1, setDate1] = useState("");
    const [provedor, setProvedor] = useState({});
    const [servico, setServico] = useState({});
    const [protocolo, setProtocolo] = useState("");
    const [contrato, setContrato] = useState("");
    const [msg, setMsg] = useState({
        style: GStyle.i,
        err: ""
    });

    async function create_service(){

        let funcionario = JSON.parse(await AsyncStorage.getItem("userdata"));
        let json = {};

        if(
            date1 == "" ||
            protocolo == "" ||
            contrato == ""||
            JSON.stringify(servico) == "{}" ||
            JSON.stringify(provedor) == "{}" ||
            JSON.stringify(cliente) == "{}"
        ){
            setMsg({
                style: GStyle.v,
                err: "Algum campo não está preenchido"
            })
            setTimeout(()=>{
                setMsg({
                    style: GStyle.i,
                    err: ""
                })
            }, 4000)
            return null;
        }

        json["id_func"] = funcionario.id;
        json["data_finalizacao"] = date_formater(date1);
        json["protocolo"] = protocolo;
        json["contrato"] = contrato;
        json["status"] = "em andamento";
        json["servico"] = servico.id;
        json["provedor"] = provedor.id;
        json["cliente"] = cliente.id;

        console.log(json);


        // let config = {
        //     method: "POST",
        //     headers: {
        //         "content-type": "application/json"
        //     },
        //     body: JSON.stringify(json)
        // }

        // let response = {
        //     "400": ()=>{
        //         setMsg({
        //             style: GStyle.v,
        //             err: "Não foi possivel cadastrar esse servico, tente novamente"
        //         })
        //         setTimeout(()=>{
        //             setMsg({
        //                 style: GStyle.i,
        //                 err: ""
        //             })
        //         }, 4000)
        //     },
        //     "401": ()=>{
        //         setMsg({
        //             style: GStyle.v,
        //             err: "Você não tem autorização pra criar um serviço"
        //         })
        //         setTimeout(()=>{
        //             setMsg({
        //                 style: GStyle.i,
        //                 err: ""
        //             })
        //         }, 4000)
        //     },
        //     "201": async ()=>{
        //         setMsg({
        //             style: GStyle.v,
        //             err: "Serviço criado com sucesso!"
        //         })
        //         setDate1("");
        //         setProtocolo("");
        //         setContrato("");
        //         setServicoStyle(GStyle.i);
        //         setTimeout(()=>{
        //             setMsg({
        //                 style: GStyle.i,
        //                 err: ""
        //             })
        //         }, 4000)
        //     }
        // }


        // let f = await fetch(`${baseURL}/api/servico/create`, config);
        // response[f.status]()

    }

    const [modalAddCliente, setModalAddCliente] = useState(false);
    const [modalLocation, setModalLocation] = useState({});
    const [modalNome, setModalNome] = useState("");
    const [modalCPF, setModalCPF] = useState("");
    const [modalMsg, setModalClienteMsg] = useState({
        style: GStyle.i,
        err: ""
    });

    async function client_register(){

        if(
            modalNome == "" ||
            modalCPF == "" ||
            JSON.stringify(modalLocation) == "{}"
        ){
            setModalClienteMsg({
                style: GStyle.v,
                err: "Preencha todos os campos"
            })
            setTimeout(()=>{
                setModalClienteMsg({
                    style: GStyle.i,
                    err: ""
                })
            }, 4000)
            return null;
        }

        let json = {};
        json["latitude"] = modalLocation.coord.lat;
        json["longitude"] = modalLocation.coord.lng;
        json["nome"] = modalNome.toUpperCase();
        json["cpf"] = modalCPF;
        json["endereco"] = modalLocation.endereco.toUpperCase();

        let config = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(json)
        }

        let response = {
            "400": ()=>{
                setModalClienteMsg({
                    style: GStyle.v,
                    err: "Não foi possivel cadastrar esse cliente, tente novamente"
                })
                setTimeout(()=>{
                    setModalClienteMsg({
                        style: GStyle.i,
                        err: ""
                    })
                }, 4000)
            },
            "201": async ()=>{
                setModalAddCliente(false);
                let f = await fetch(`${baseURL}/api/cliente`);
                let r = await f.json();
                setClientes(r)
            }
        }

        let f = await fetch(`${baseURL}/api/cliente`, config);

        response[f.status]()

    }

    const [visibleModalCliente, setVisibleModalCliente] = useState(false);
    const [clienteRefresh, setClienteRefresh] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [showClientes, setShowClientes] = useState([]);
    const [clienteTextInput, setClienteTextInput] = useState("");

    async function refreshCliente() {
        try{
            setClienteTextInput("")
            let f = await fetch(`${baseURL}/api/cliente`);
            let r = await f.json();
            setClientes(r);
            setShowClientes(r);
        }catch(err){
            console.error(err);
        }
        setTimeout(()=> {
            setClienteRefresh(false)
        }, 2000)
    }

    useEffect(()=>{
        if(clienteTextInput == ""){
            setShowClientes(clientes)
        }else{
            let filtro = clientes.filter((e)=>{
                return e.cpf.includes(clienteTextInput) || e.nome.includes(clienteTextInput)
            })
            setShowClientes(filtro)
        }
    }, [clienteTextInput])

    const [visibleModalProvedor, setVisibleModalProvedor] = useState(false);
    const [provedorRefresh, setProvedorRefresh] = useState(false);
    const [provedores, setProvedores] = useState([]);
    const [showProvedores, setShowProvedores] = useState([]);
    const [provedorTextInput, setProvedorTextInput] = useState("")

    async function refreshProvedor() {
        try{
            setProvedorTextInput("");
            let f = await fetch(`${baseURL}/api/provedor`);
            let r = await f.json();
            setProvedores(r);
            setShowProvedores(r);
        }catch(err){
            console.error(err);
        }
        setTimeout(()=> {
            setProvedorRefresh(false)
        }, 2000)
    }

    useEffect(()=>{
        if(provedorTextInput == ""){
            setShowProvedores(clientes)
        }else{
            let filtro = provedores.filter((e)=>{
                return e.name.includes(provedorTextInput)
            })
            setShowProvedores(filtro)
        }
    }, [provedorTextInput])

    const [visibleModalServicoProvedor, setVisibleModalServicoProvedor] = useState(false);
    const [servicoProvedorRefresh, setServicoProvedorRefresh] = useState(false);
    const [servicosProvedor, setServicosProvedor] = useState([]);
    const [showProvedorServicos, setShowProvedorServicos] = useState([]);
    const [servicosProvedorTextInput, setServicosProvedorTextInput] = useState("");
    const [btnServicoProvedor, setBtnServicoProvedor] = useState(true);

    useEffect(async ()=>{
        if(provedor.id != undefined){
            let f = await fetch(`${baseURL}/api/provedor/${provedor.id}`);
            let r = await f.json();
            setServicosProvedor(r.servicos);
            setShowProvedorServicos(r.servicos);
            setBtnServicoProvedor(false);
        }
    }, [provedor])

    async function refreshProvedorServico() {
        try{
            setServicosProvedorTextInput("");
            let f = await fetch(`${baseURL}/api/provedor/${provedor.id}`);
            let r = await f.json();
            setServicosProvedor(r.servicos)
            setShowProvedorServicos(r.servicos)
        }catch(err){
            console.error(err);
        }
        setTimeout(()=> {
            setServicoProvedorRefresh(false)
        }, 2000)
    }

    useEffect(()=>{
        if(servicosProvedorTextInput == ""){
            setShowProvedores(servicosProvedor)
        }else{
            let filtro = servicosProvedor.filter((e)=>{
                return e.servico.includes(servicosProvedorTextInput)
            })
            setShowProvedorServicos(filtro)
        }
    }, [servicosProvedorTextInput])
    

    return(
        <KeyboardAvoidingView behavior={'padding'} style={GStyle.pageView}>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalAddCliente}
                onRequestClose={() => {setModalAddCliente(!modalAddCliente)}}
            >

                <View style={GStyle.pageView}>
                    <View style={[style.container, {justifyContent: "space-around"}]}>
                        <TouchableOpacity
                            style={{width: 50}}
                            onPress={() => {setModalAddCliente(!modalAddCliente)}}
                        >
                            <FontAwesomeIcon
                                icon={faCircleChevronLeft}
                                size={ 50 }
                                color="white"
                            />
                        </TouchableOpacity>
                        <View>
                            <View style={style.itemView}>
                                    <Text style={style.label}>CPF</Text>
                                    <TextInput
                                        value={modalCPF}
                                        keyboardType={'numeric'}
                                        onChangeText={(e)=>{setModalCPF(e)}}
                                        style={style.defaultInput}
                                    />
                            </View>

                            <View style={style.itemView}>
                                    <Text style={style.label}>Nome</Text>
                                    <TextInput
                                        autoCapitalize = {"characters"}
                                        value={modalNome}
                                        onChangeText={(e)=>{setModalNome(e)}}
                                        style={style.defaultInput}
                                    />
                            </View>

                            <View style={[style.itemView, ]}>
                                <Text style={style.label}>Endereço</Text>
                                <GooglePlacesAutocomplete
                                    placeholder=''
                                    styles={{
                                        container: {
                                            flex: 0,
                                        },
                                        textInput: {
                                            borderTopLeftRadius: 0,
                                        },
                                        listView: {
                                            height: 220,
                                            position: 'absolute',
                                            top: '100%',
                                            zIndex: 100
                                        },
                                    }}
                                    onPress={(data, details = null) => {
                                        setModalLocation({
                                            endereco: details.name,
                                            coord: details.geometry.location
                                        });
                                    }}
                                    query={{
                                    key: googleApi,
                                    language: 'pt-br',
                                    }}
                                    fetchDetails={true}
                                    enablePoweredByContainer={false}
                                />
                            </View>
                        </View>

                        <Text style={[GStyle.whiteMsg, modalMsg.style]}>{modalMsg.err}</Text>
                        <TouchableOpacity onPress={()=>client_register()} style={[GStyle.btn, GStyle.whiteBtn]}>
                            <FontAwesomeIcon icon={faUserPlus} size={40} color={mainColor} />
                            <Text style={GStyle.whiteBtnText}>Salvar</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={visibleModalCliente}
                onRequestClose={() => {setVisibleModalCliente(!visibleModalCliente)}}
            >

                <View style={GStyle.pageView}>
                    <ScrollView 
                        style={style.containerWhite}
                        refreshControl={
                            <RefreshControl
                                refreshing={clienteRefresh}
                                onRefresh={refreshCliente}
                            />
                        }
                    >
                        <View
                            style={{flexDirection: "row",alignItems:"center", justifyContent:"space-around", marginTop:20, marginBottom: 50}}
                        >
                            <TouchableOpacity
                                style={{width: 50}}
                                onPress={() => {setVisibleModalCliente(!visibleModalCliente)}}
                            >
                                    <FontAwesomeIcon
                                        icon={faCircleChevronLeft}
                                        size={ 50 }
                                        color={mainColor}
                                    />
                            </TouchableOpacity>
                            <TextInput
                                value={clienteTextInput}
                                onChangeText={(e)=>{setClienteTextInput(e)}}
                                style={style.clientePesquisa}
                            />
                        </View>
                        {
                            showClientes.map((e, index)=>{
                                return (
                                    <TouchableOpacity style={style.clienteContainer} key={index} onPress={()=>{
                                        setCliente(e);
                                        setVisibleModalCliente(!visibleModalCliente);
                                    }}>
                                        <Text style={style.clienteName}>
                                            {e.nome}
                                        </Text>
                                        <View style={style.clienteInfos}>
                                            <Text style={style.clienteInfo}>
                                                Endereço:
                                            </Text>
                                            <Text style={style.clienteTextInfo}>
                                                {e.endereco}
                                            </Text>
                                            <View style={[GStyle.line, style.lineMargin]}></View>
                                            <Text style={style.clienteInfo}>
                                                CPF:
                                            </Text>
                                            <Text style={style.clienteTextInfo}>
                                                {e.cpf}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </ScrollView>
                </View>

            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={visibleModalProvedor}
                onRequestClose={() => {setVisibleModalProvedor(!visibleModalProvedor)}}
            >

                <View style={GStyle.pageView}>
                    <ScrollView
                        style={style.containerWhite}
                        refreshControl={
                            <RefreshControl
                                refreshing={provedorRefresh}
                                onRefresh={refreshProvedor}
                            />
                        }
                    >
                        <View
                            style={{flexDirection: "row",alignItems:"center", justifyContent:"space-around", marginTop:20, marginBottom: 50}}
                        >
                            <TouchableOpacity
                                style={{width: 50}}
                                onPress={() => {setVisibleModalProvedor(!visibleModalProvedor)}}
                            >
                                    <FontAwesomeIcon
                                        icon={faCircleChevronLeft}
                                        size={ 50 }
                                        color={mainColor}
                                    />
                            </TouchableOpacity>
                            <TextInput
                                value={provedorTextInput}
                                onChangeText={(e)=>{setProvedorTextInput(e)}}
                                style={style.clientePesquisa}
                            />
                        </View>
                        {
                            showProvedores.map((e, index)=>{
                                return (
                                    <TouchableOpacity style={style.clienteContainer} key={index} onPress={()=>{
                                        setProvedor(e);
                                        setVisibleModalProvedor(!visibleModalProvedor);
                                    }}>
                                        <Text style={style.provedorName}>
                                            {e.name}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </ScrollView>
                </View>

            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={visibleModalServicoProvedor}
                onRequestClose={() => {setVisibleModalServicoProvedor(!visibleModalServicoProvedor)}}
            >

                <View style={GStyle.pageView}>
                    <ScrollView
                        style={style.containerWhite}
                        refreshControl={
                            <RefreshControl
                                refreshing={servicoProvedorRefresh}
                                onRefresh={refreshProvedorServico}
                            />
                        }
                    >
                        <View
                            style={{flexDirection: "row",alignItems:"center", justifyContent:"space-around", marginTop:20, marginBottom: 50}}
                        >
                            <TouchableOpacity
                                style={{width: 50}}
                                onPress={() => {setVisibleModalServicoProvedor(!visibleModalServicoProvedor)}}
                            >
                                    <FontAwesomeIcon
                                        icon={faCircleChevronLeft}
                                        size={ 50 }
                                        color={mainColor}
                                    />
                            </TouchableOpacity>
                            <TextInput
                                value={servicosProvedorTextInput}
                                onChangeText={(e)=>{setServicosProvedorTextInput(e)}}
                                style={style.clientePesquisa}
                            />
                        </View>
                        {
                            showProvedorServicos.map((e, index)=>{
                                return (
                                    <TouchableOpacity style={style.clienteContainer} key={index} onPress={()=>{
                                        setServico(e);
                                        setVisibleModalServicoProvedor(!visibleModalServicoProvedor);
                                    }}>
                                        <Text style={style.provedorName}>
                                            {e.servico}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </ScrollView>
                </View>

            </Modal>

            <ScrollView style={style.container} showsVerticalScrollIndicator={false}>

                <TouchableOpacity style={[GStyle.btn, style.btn, GStyle.whiteBtn]} onPress={()=>setModalAddCliente(true)}>
                    <FontAwesomeIcon icon={faCirclePlus} size={40} color={mainColor} />
                    <Text style={GStyle.whiteBtnText}>Adicionar cliente</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[GStyle.btn, style.btn, GStyle.whiteBtn]} onPress={()=>setVisibleModalCliente(true)}>
                    <FontAwesomeIcon icon={faUser} size={40} color={mainColor} />
                    <Text style={GStyle.whiteBtnText}>Selecionar cliente</Text>
                </TouchableOpacity>

                <View style={style.itemView}>
                    <Text style={style.label}>Nome</Text>
                    <Text style={[style.defaultInput, {fontSize: 20}]}>{cliente.nome}</Text>
                </View>

                <View style={style.itemView}>
                    <Text style={style.label}>CPF</Text>
                    <Text style={[style.defaultInput, {fontSize: 20}]}>{cliente.cpf}</Text>
                </View>

                <View style={style.itemView}>
                    <Text style={style.label}>Endereco</Text>
                    <Text style={[style.defaultInput, {fontSize: 20}]}>{cliente.endereco}</Text>
                </View>

                <View style={[GStyle.fontAwesomeSomething, style.FAS]}>
                    <FontAwesomeIcon
                        icon={faCalendarCheck}
                        size={ 50 }
                        color="white"
                    />
                    <Text style={style.input2}>{date1}</Text>
                </View>

                <DatePicker
                    options={{
                        textHeaderColor: mainColor,
                        textDefaultColor: 'black',
                        mainColor: mainColor,
                        textSecondaryColor: "black",
                        borderColor: 'rgba(73, 107, 124, 1)',
                    }}
                    style={[style.FAS, {borderRadius: 10}]}
                    mode="calendar"
                    onSelectedChange={date => {
                        let a = new Date(date);
                        let b = new Date(currentDate());
                        if(a<b){
                            ToastAndroid.showWithGravity("A Data tem que ser pós o dia de hoje" ,ToastAndroid.SHORT,ToastAndroid.CENTER)
                        }else{
                            let i = date.split("/")
                            setDate1(`${i[2]}/${i[1]}/${i[0]}`)
                        }
                    }}
                />

                <TouchableOpacity style={[GStyle.btn, style.btn, GStyle.whiteBtn]} onPress={()=>setVisibleModalProvedor(true)}>
                    <FontAwesomeIcon icon={faUser} size={40} color={mainColor} />
                    <Text style={GStyle.whiteBtnText}>Selecionar provedor</Text>
                </TouchableOpacity>

                <View style={style.itemView}>
                    <Text style={style.label}>Provedor</Text>
                    <Text style={[style.defaultInput, {fontSize: 20}]}>{provedor.name}</Text>
                </View>

                <TouchableOpacity style={[GStyle.btn, style.btn, GStyle.whiteBtn]} disabled={btnServicoProvedor} onPress={()=>setVisibleModalServicoProvedor(true)}>
                    <FontAwesomeIcon icon={faUser} size={40} color={mainColor} />
                    <Text style={GStyle.whiteBtnText}>Selecionar servico</Text>
                </TouchableOpacity>

                <View style={style.itemView}>
                    <Text style={style.label}>Servico</Text>
                    <Text style={[style.defaultInput, {fontSize: 20}]}>{servico.servico}</Text>
                </View>

                <View style={style.itemView}>
                    <Text style={style.label}>Protocolo</Text>
                    <TextInput
                        value={protocolo}
                        keyboardType={"numeric"}
                        onChangeText={(e)=>setProtocolo(e)}
                        style={style.defaultInput}
                    />
                </View>

                <View style={style.itemView}>
                    <Text style={style.label}>Contrato</Text>
                    <TextInput
                        value={contrato}
                        keyboardType={"numeric"}
                        onChangeText={(e)=>setContrato(e)}
                        style={style.defaultInput}
                    />
                </View>

                <Text style={[GStyle.whiteMsg, msg.style]}>{msg.err}</Text>

                <TouchableOpacity onPress={()=>create_service()} style={[GStyle.btn, style.btn, GStyle.whiteBtn]}>
                    <FontAwesomeIcon icon={faUserPlus} size={40} color={mainColor} />
                    <Text style={GStyle.whiteBtnText}>Criar serviço</Text>
                </TouchableOpacity>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}
