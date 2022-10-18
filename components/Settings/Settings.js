import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { GlobalStyle } from "../GlobalStyle";

export default function Settings() {
	const [settings, setSettings] = useState(null);

	useEffect(() => {
		AsyncStorage.getItem("settings", (error, result) => {
			let stored = {
				//default settings
				vibration: true,
			};
			if (result) {
				stored = JSON.parse(result);
			}
			if (error) {
				console.error(error);
			}
			setSettings(stored);
		});
	}, []);

	const updateSettings = (prop, value) => {
		let newSettings = { ...settings, [prop]: value };
		setSettings(newSettings);
		try {
			AsyncStorage.setItem("settings", JSON.stringify(newSettings));
		} catch (error) {
			console.error(error);
		}
	};

	if (settings === null) {
		return <></>;
	}

	return (
		<View style={GlobalStyle.viewContainer}>
			<View style={styles.settingsItem}>
				<Text>Vibration</Text>
				<Switch value={settings.vibration} onValueChange={() => updateSettings("vibration", !settings.vibration)} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	settingsItem: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
});
