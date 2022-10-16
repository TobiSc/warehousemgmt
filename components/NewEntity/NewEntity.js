import { useEffect, useState } from "react";
import { Button, FlatList, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { GlobalStyle } from "../GlobalStyle";
import { get } from "lodash";
import Realm from "realm";
import { Entity } from '../../db/Schemes';


export default function NewEntity({route, navigation}) {
    const { _id } = route.params || {};
    const [entity, SetEntity] = useState({_id, name: ""});

    useEffect(()=>{
        const upsertEntity = async () => {
            const realm = await Realm.open({schema: [Entity]});
            let result;
            realm.write(()=>{
                result = realm.create("Entity", entity, "modified");
            })
            console.log("Write result:", result)
            console.log("Database:", realm.objects("Entity").map((e)=>e.name));
            realm.close()
        }
        upsertEntity();
    }, [entity])

    const setEntityProp = async (prop, value) => {
        let newEntity = {...entity, [prop]: value};
        SetEntity(newEntity);
    }

    return (
        <View style={GlobalStyle.viewContainer}>
            <Text>Name</Text>
            <TextInput style={GlobalStyle.input} onChangeText={(v)=>setEntityProp("name", v)} value={entity.name} />
        </View>
    );
  }