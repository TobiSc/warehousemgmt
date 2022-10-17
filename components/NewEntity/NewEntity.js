import { useEffect, useState } from "react";
import { Button, FlatList, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { GlobalStyle } from "../GlobalStyle";
import { get } from "lodash";
import { Entity, useRealm } from "../../db/Schemes";

export default function NewEntity({ route, navigation }) {
  const { _id } = route.params || {};
  const [entity, SetEntity] = useState({ _id, name: "" });
  const realm = useRealm();

  useEffect(() => {
    realm.write(() => {
      realm.create(
        "Entity",
        Entity.generate(entity._id, entity.name),
        "modified"
      );
    });
  }, [entity]);

  const setEntityProp = async (prop, value) => {
    let newEntity = { ...entity, [prop]: value };
    SetEntity(newEntity);
  };

  return (
    <View style={GlobalStyle.viewContainer}>
      <Text>Name</Text>
      <TextInput
        style={GlobalStyle.input}
        onChangeText={(v) => setEntityProp("name", v)}
        value={entity.name}
      />
    </View>
  );
}