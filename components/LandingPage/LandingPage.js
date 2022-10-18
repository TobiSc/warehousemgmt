import { useEffect, useState } from "react";
import { Button, Modal, ScrollView, StyleSheet, View } from "react-native";
import EntityList from "./EntityList/EntityList";

import { GlobalStyle } from "../GlobalStyle";
import { SpeedDial } from "@rneui/themed";
import { ScanModes } from "../ScanPage/ScanPage";

export default function LandingPage({ route, navigation }) {
	const [speedDialOpen, setSpeedDialOpen] = useState(false);
	const openEntity = (id) => {
		navigation.navigate("EntityDetails", { id });
	};

	return (
		<>
			<ScrollView style={GlobalStyle.viewContainer}>
				<EntityList onEntityPressed={openEntity} />
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
					icon={{ name: "print", color: "#fff" }}
					title="Neue QR-Codes"
					onPress={() => {
						navigation.navigate("QRGenerator");
						setSpeedDialOpen(false);
					}}
				/>
				<SpeedDial.Action
					icon={{ name: "library-add", color: "#fff" }}
					title="Mehrere neue Entitäten"
					onPress={() => {
						navigation.navigate("ScanPage", { onResult: () => {}, mode: ScanModes.Multiple });
						setSpeedDialOpen(false);
					}}
				/>
				<SpeedDial.Action
					icon={{ name: "add-box", color: "#fff" }}
					title="Neue Entität"
					onPress={() => {
						navigation.navigate("ScanPage", { onResult: () => {}, mode: ScanModes.Single });
						setSpeedDialOpen(false);
					}}
				/>
			</SpeedDial>
		</>
	);
}
