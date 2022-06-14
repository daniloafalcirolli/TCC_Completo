import React, { useState, useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import { styles } from './style';
// import MapView from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';


import config from '../../config';

const origin_destiny = {latitude: -22.68613638636362, longitude: -46.990469032833694};
const destination1 = {latitude: -22.69718702890363,  longitude: -46.99062515023387};
const destination2 = {latitude: -22.703460351794455, longitude: -46.98696463300924};
const destination3 = {latitude: -22.701096661765856, longitude: -46.982778499690234}
const destination4 = {latitude: -22.692174196516866, longitude: -46.98458286734922};

const teste = [ destination1, destination2, destination3, destination4 ];


export default function Home() {
    // const mapEl = useRef(null);
    // let key = 0;

    // function getFormattedAddress(obj){
    //     // const response = await fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + (item.latitude) + "," + (item.longitude) + "&key=" + config.googleApi);
    //     // const data = await response.json();
    //     // const formatted_address = data.results[0].formatted_address;
    //     var retorno = "";
    //     fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + (obj.latitude) + "," + (obj.longitude) + "&key=" + config.googleApi)
    //     .then(resp => resp.json())
    //     .then(data => { 
    //         retorno = data.results[0].formatted_address;
    //         // console.log(retorno);
    //         // setEstado(retorno);
    //         return retorno;
    //     });

    // }

    
    return (
        <View><Text>OI</Text></View>
        // <View style={styles.container}>
        //     <MapView
        //         style={styles.map}
        //         initialRegion={{
        //             latitude: origin_destiny.latitude, 
        //             longitude: origin_destiny.longitude,
        //             latitudeDelta: 0.0422,
        //             longitudeDelta: 0.0421,
        //         }}
        //         ref={mapEl}
        //     >
        //         {
        //             teste && 
        //             <>
        //                 {   
        //                     teste.map((item, index) =>{
        //                         if(index == 0){
        //                             key++;
        //                             return(
        //                                 <>
        //                                     <MapViewDirections 
        //                                         origin={origin_destiny}
        //                                         destination={teste[0]}
        //                                         apikey={config.googleApi}
        //                                         strokeWidth={3}
        //                                         key={key}
        //                                     />
        //                                     <MapViewDirections 
        //                                         origin={teste[0]}
        //                                         destination={teste[1]}
        //                                         apikey={config.googleApi}
        //                                         strokeWidth={3}
        //                                         key={key + 50}
        //                                     />
        //                                 </>
        //                             )
        //                         }else if(index == (teste.length - 1)){
        //                             key++;
        //                             return(
        //                                 <MapViewDirections 
        //                                     origin={teste[teste.length -1]}
        //                                     destination={origin_destiny}
        //                                     apikey={config.googleApi}
        //                                     strokeWidth={3}
        //                                     key={key}
        //                                 />
        //                             )
        //                         }else{
        //                             key++;
        //                            return(
        //                                 <MapViewDirections 
        //                                     origin={item}
        //                                     destination={teste[index + 1]}
        //                                     apikey={config.googleApi}
        //                                     strokeWidth={3}
        //                                     key={key}
        //                                 />
        //                             )
        //                         }
        //                     })
        //                 }
        //                 {
        //                     teste.map((item, index) => {
        //                         return(
        //                             <MapView.Marker
        //                                 coordinate={item}
        //                                 key={index}
        //                             />
        //                         )
        //                     })
        //                 } 
        //                 {
        //                    <MapView.Marker 
        //                         coordinate={origin_destiny}
        //                    />
        //                 }
        //             </>
        //         }
        //     </MapView>
        //     <View style={styles.search}>
        //         {   
        //         }
        //     </View>
        // </View>
    );
}
