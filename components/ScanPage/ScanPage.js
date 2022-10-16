import { get } from "lodash";
import { useEffect, useState } from "react";
import { Button, FlatList, Modal, StyleSheet, Text, View } from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { GlobalStyle } from "../GlobalStyle";
import { useIsFocused } from "@react-navigation/native";
import Realm from "realm";
import { Entity } from "../../db/Schemes";


export default function ScanPage({route, navigation}) {
    const [hasPermission, setHasPermission] = useState(false);
    const [key, setKey] = useState(0);
    const isFocused = useIsFocused();
    const [entityIds, setEntityIds] = useState([])

    useEffect(()=>{
        const requestPermissions = async () => {
            if (!hasPermission) {
                const { status } = await BarCodeScanner.requestPermissionsAsync();
                if (status === "granted") {
                    setHasPermission(true);
                }
                else {
                    return;
                }
            }
        }
        requestPermissions();
    }, [])

    const onScanned = async ({type, data}) => {
        const realm = await Realm.open({schema: [Entity]});
        const entity = realm.objectForPrimaryKey("Entity", data);
        console.log("entities scanned: ",[...new Set([...entityIds, data])])
        setEntityIds([...new Set([...entityIds, data])]);
        setKey(key + 1);
        if (!entity) {
            navigation.navigate("NewEntity", {_id: data});
        }
    }

    return (
        <View style={GlobalStyle.viewContainer}>
            {hasPermission && isFocused && <BarCodeScanner key={key} style={{height: "100%", width: "100%"}} barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]} onBarCodeScanned={onScanned} />}
        </View>
    );
  }