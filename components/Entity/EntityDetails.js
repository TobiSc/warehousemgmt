import { Button, Text, TextInput, View } from "react-native";
import { GlobalStyle } from "../GlobalStyle";
import { useObject, useRealm } from "../../db/Schemes";
import EntityList from "../LandingPage/EntityList/EntityList";

export default function EntityDetails({ route, navigation }) {
	const { _id } = route.params || {};
	const realm = useRealm();
	const entity = useObject("Entity", _id);

	const addChildren = () => {
		navigation.navigate("ScanPage", { onResult });
	};

	const onResult = (_id) => {
		const child = realm.objectForPrimaryKey("Entity", _id);
		let parent = entity;
		let isRecursion = false;
		while (parent) {
			if (parent._id.toString() === child._id.toString()) {
				isRecursion = true;
				break;
			}
			parent = parent.parent;
		}
		if (isRecursion) return;
		realm.write(() => {
			child.parent = entity;
		});
	};

	const setEntityProp = async (prop, value) => {
		console.log(value);
		realm.write(() => {
			entity[prop] = value;
			console.log(entity.name);
		});
	};

	return (
		<View style={GlobalStyle.viewContainer}>
			<Text>Name</Text>
			<TextInput style={GlobalStyle.input} onChangeText={(v) => setEntityProp("name", v)} value={entity.name} />
			<Text>Untergeordnet</Text>
			<EntityList parent={_id} />
			<Button onPress={addChildren} title="Kindknoten hinzufügen" />
		</View>
	);
}
