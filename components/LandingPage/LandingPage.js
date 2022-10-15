import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import uuid from 'react-uuid';
import EntityList from './EntityList/EntityList';
import QRCode from 'qrcode'
import * as Print from 'expo-print';
import Realm from "realm";

import BarcodeScanner from '../BarcodeScanner/BarcodeScanner';
import { Entity } from '../../db/Schemes';


const start = `<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
</head>
<body style="text-align: center;">`

const end = `</body>
</html>`


export default function LandingPage() {
  const [size, setSize] = useState("4");
  const [sizeInput, setSizeInput] = useState("4");
  const [amount, SetAmount] = useState("10")

  const generatePDF = () => {
    let proms = Array.from(Array(parseInt(amount))).map(e=>QRCode.toString(uuid()))
    Promise.all(proms).then(res=>{
      let svgs = res.map(svg=>`<svg width="${size}cm"${svg.slice(4)}`).join("");
      let html = `${start}${svgs}${end}`
      console.log(html)
      Print.printAsync({html})
    })
  }

  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  useEffect(()=>{
    if (sizeInput) {
      let newSize = clamp(parseFloat(sizeInput), 0, 27.9);
      setSize(newSize.toString())
    }
  }, [sizeInput])

  const onResult = async (data) => {
    const realm = await Realm.open({schema: [Entity]});
    let entity;
    realm.write(()=>{
      entity = realm.create("Entity", {_id: data, name: "test" });
    })
    console.log("New Realm object:", data);
    console.log("Database:", realm.objects("Entity").map(o=>o._id));
  }

  return (
      <>
        <Text>Größe in cm:</Text>
        <TextInput keyboardType="numeric" style={styles.input} onChangeText={setSizeInput} value={sizeInput} />
        <Text>Anzahl:</Text>
        <TextInput keyboardType="numeric" style={styles.input} onChangeText={SetAmount} value={amount} />
        <EntityList />
        <View style={styles.fixedBottomButton}>
          <Button onPress={generatePDF} title="PDF drucken" />
          <BarcodeScanner onResult={onResult}  />
        </View>
      </>
  );
}

const styles = StyleSheet.create({
  fixedBottomButton: {
    position: "absolute",
    left: 12,
    bottom: 12,
    width: "100%"
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
})