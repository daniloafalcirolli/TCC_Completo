import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { baseURL, mainColor } from '../../config'
import { styles } from './styles';

export default function Login({ navigation }){
    const [username, setUsername] = useState("");
    const [cpf, setCpf] = useState("");
    const [msg, setMsg] = useState({
        style: styles.i,
        msg: ""
    });

    useEffect(async () => {
        try{
            let f = await fetch(`${baseURL}/api/funcionario/${JSON.parse(await AsyncStorage.getItem("userdata")).id}`)
            let resp = await f.json();
            if(await AsyncStorage.getItem("userdata") === JSON.stringify(resp)){
                navigation.navigate("Hub")
            }
        }catch(err){
            console.log(err)
        }
    }, [])

    const autenticar = async() => {

        if(cpf == "" || username == "" ) return;

        let user = {
            username: username,
            cpf: cpf
        }

        let url =  baseURL + '/api/funcionario/login';

        let settings = {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(user)
        };

        try {
            const resp = await fetch(url, settings);

            let act = {
                "200": async () => {
                    let resp2 = await resp.json();
                    await AsyncStorage.setItem('userdata', JSON.stringify(resp2));
                    navigation.navigate("Hub");
                },
                "406": () => {
                    setMsg({
                        msg: "Usuario destivado",
                        style: styles.v,
                    });
                },
                "404": () => {
                    setMsg({
                        msg: "Usuario inexistente",
                        style: styles.v,
                    });
                },
                "400": () => {
                    setMsg({
                        msg: "Não foi possivel fazer login",
                        style: styles.v,
                    });
                }
            }

            act[`${resp.status}`]()
            setTimeout(() => {
                setMsg({
                    msg: "",
                    style: styles.i,
                });
            }, 3000)
        } catch (error) {
            setMsg({
                msg: "Não foi possivel fazer login",
                style: styles.v,
            });
            setTimeout(() => {
                setMsg({
                    msg: "",
                    style: styles.i,
                });
            }, 3000)
        }

    }

    return(
        <View style={styles.banner}>
            <View style={styles.background}>
                <Text style={[styles.msg, msg.style]}>{msg.msg}</Text>
            </View>
            <View style={styles.card}>
                <View style={styles.container}>
                    <View style={styles.elements}>
                        <Text style={styles.h1}>Login</Text>
                        <View style={{width: '100%',}}>
                            <TextInput
                                value={username}
                                onChangeText={setUsername}
                                placeholder="Username"
                                style={[styles.input, {marginBottom : "10%"}]}
                            />
                            <TextInput
                                value={cpf}
                                onChangeText={setCpf}
                                placeholder="CPF"
                                style={styles.input}
                                keyboardType="numeric"
                            />
                        </View>
                        <TouchableOpacity onPress={ () => { autenticar() } } style={styles.button}>
                            <Text style={styles.buttonTxT}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}
