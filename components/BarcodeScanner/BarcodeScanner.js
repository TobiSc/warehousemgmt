import { get } from "lodash";
import { useState } from "react";
import { Button, FlatList, Modal, StyleSheet, Text, View } from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function BarcodeScanner({onResult}) {
    const [hasPermission, setHasPermission] = useState(false);
    const [scanRequested, setScanRequested] = useState(false);

    const scanQrCode = async () => {
        console.log("start scan")
        if (!hasPermission) {
            console.log("no permission")
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            console.log("status")
            if (status === "granted") {
                setHasPermission(true);
            }
            else {
                return;
            }
        }
        console.log("permission there")
        setScanRequested(true)
    }

    const onScanned = ({type, data}) => {
        setScanRequested(false);
        if (onResult) onResult(data);
    }

    return (
        <>
            <Button title="Barcode scannen" onPress={scanQrCode} />
            {scanRequested && (
            <Modal visible={true} style={{width:"100%", height: "100%"}}>
                <BarCodeScanner style={{height: "100%", width: "100%"}} barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]} onBarCodeScanned={onScanned} />
            </Modal>
            )}
        </>
    );
  }