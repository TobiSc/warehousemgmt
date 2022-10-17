import { get, trim } from "lodash";
import { Text, TextInput, View } from "react-native";
import { GlobalStyle } from "../../GlobalStyle";

export default function EntityEditor({ entity, setProp }) {
	const setTags = (v) => {
		let tags = v.split(",").map((tag) => trim(tag));
		setProp("tags", tags);
	};
	return (
		<View>
			<Text>Name</Text>
			<TextInput style={GlobalStyle.input} onChangeText={(v) => setProp("name", v)} value={entity.name} />
			<Text>Tags (mit Komma trennen)</Text>
			<TextInput style={GlobalStyle.input} onChangeText={setTags} value={get(entity, "tags", []).join(",")} />
			<Text>Beschreibung/Notizen</Text>
			<TextInput
				multiline={true}
				textAlignVertical="top"
				style={{ ...GlobalStyle.input, height: "auto" }}
				onChangeText={(v) => setProp("description", v)}
				value={entity.description}
			/>
		</View>
	);
}
