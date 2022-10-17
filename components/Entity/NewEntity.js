import { useEffect, useState } from "react";
import { View } from "react-native";
import { GlobalStyle } from "../GlobalStyle";
import { Entity, useRealm } from "../../db/Schemes";
import EntityEditor from "./EntityEditor/EntityEditor";

export default function NewEntity({ route, navigation }) {
	const { id, onCreated } = route.params || {};
	const realm = useRealm();
	const [inputProps, setInputProps] = useState({});

	useEffect(() => {
		let realmObject;
		realm.write(() => {
			realmObject = realm.create("Entity", Entity.generate(id, ""));
		});
		setInputProps({ name: realmObject.name, tags: realmObject.tags, description: realmObject.description });
		if (onCreated) {
			onCreated(id);
		}
	}, []);

	const setEntityProp = async (prop, value) => {
		let realmObject = realm.objects("Entity").find((e) => e.id === id);
		realm.write(() => {
			realmObject[prop] = value;
		});
		setInputProps({ ...inputProps, [prop]: value });
	};

	return (
		<View style={GlobalStyle.viewContainer}>
			<EntityEditor entity={inputProps} setProp={setEntityProp} />
		</View>
	);
}
