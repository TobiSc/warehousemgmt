import { Button, ScrollView, Text, View } from "react-native";
import { GlobalStyle } from "../GlobalStyle";
import { useObject, useQuery, useRealm } from "../../db/Schemes";
import EntityList from "../LandingPage/EntityList/EntityList";
import EntityEditor from "./EntityEditor/EntityEditor";
import { useState } from "react";
import { SpeedDial } from "@rneui/themed";

export default function EntityDetails({ route, navigation }) {
	const { id } = route.params || {};
	const realm = useRealm();
	const entity = useQuery("Entity").find((e) => e.id === id);
	const [inputProps, setInputProps] = useState({ name: entity.name, tags: entity.tags, description: entity.description });
	const [speedDialOpen, setSpeedDialOpen] = useState(false);

	const onResult = (id) => {
		console.log("resultId:", id);
		let child = realm.objects("Entity").find((e) => e.id === id);
		let parent = entity;
		let isRecursion = false;
		while (parent) {
			if (parent.id === child.id) {
				isRecursion = true;
				break;
			}
			parent = parent.parent;
		}
		if (isRecursion) return;
		console.log(`Adding ${child.id} as child to ${entity.id}`);
		realm.write(() => {
			child.parent = entity;
		});
	};

	const setEntityProp = (prop, value) => {
		setInputProps({ ...inputProps, [prop]: value });
		realm.write(() => {
			entity[prop] = value;
		});
	};

	return (
		<>
			<ScrollView style={GlobalStyle.viewContainer}>
				<EntityEditor entity={inputProps} setProp={setEntityProp} />
				<Text>Untergeordnet</Text>
				<EntityList parentId={id} />
			</ScrollView>
			<SpeedDial
				isOpen={speedDialOpen}
				icon={{ name: "qr-code-2", color: "#fff" }}
				openIcon={{ name: "close", color: "#fff" }}
				onOpen={() => setSpeedDialOpen(true)}
				onClose={() => setSpeedDialOpen(false)}
				labelPressable={true}
			>
				<SpeedDial.Action
					icon={{ name: "library-add", color: "#fff" }}
					title="Mehrere neue untergeordnete Entitäten"
					onPress={() => {
						navigation.navigate("ScanPage", { onResult, mode: ScanModes.Multiple });
						setSpeedDialOpen(false);
					}}
				/>
				<SpeedDial.Action
					icon={{ name: "add-box", color: "#fff" }}
					title="Neue untergeordnete Entität"
					onPress={() => {
						navigation.navigate("ScanPage", { onResult, mode: ScanModes.Single });
						setSpeedDialOpen(false);
					}}
				/>
			</SpeedDial>
		</>
	);
}
