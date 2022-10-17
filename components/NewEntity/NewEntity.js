import { useEffect, useState } from "react";
import { Button, FlatList, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { GlobalStyle } from "../GlobalStyle";
import { get } from "lodash";
import { Entity, useObject, useQuery, useRealm } from "../../db/Schemes";
import { Realm } from "@realm/react";

export default function NewEntity({ route, navigation }) {
	const { id, onCreated } = route.params || {};
	const realm = useRealm();
	let realmObject = {};

	useEffect(() => {
		realm.write(() => {
			realmObject = realm.create("Entity", Entity.generate(id, ""));
		});
		if (onCreated) {
			onCreated(realmObject._id);
		}
	}, []);

	const setEntityProp = async (prop, value) => {
		realm.write(() => {
			realmObject[prop] = value;
		});
	};

	return (
		<View style={GlobalStyle.viewContainer}>
			<Text>Name</Text>
			<TextInput style={GlobalStyle.input} onChangeText={(v) => setEntityProp("name", v)} value={realmObject.name} />
		</View>
	);
}
