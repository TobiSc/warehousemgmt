import { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import EntityList from "./EntityList/EntityList";

import { useRealm } from "../../db/Schemes";
import { GlobalStyle } from "../GlobalStyle";
import { get } from "lodash";
import QRGeneratorModal from "./QRGeneratorModal/QRGeneratorModal";

const start = `<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
</head>
<body style="text-align: center;">`;

const end = `</body>
</html>`;

export default function LandingPage({ route, navigation }) {
	const [printModalOpen, setPrintModalOpen] = useState(false);

	const openEntity = (id) => {
		navigation.navigate("EntityDetails", { id });
	};

	return (
		<ScrollView style={GlobalStyle.viewContainer}>
			<EntityList onEntityPressed={openEntity} />
			<View style={{ opacity: 0 }}>
				<Button title="Neue QR-Codes erstellen" />
				<Button title="Barcode scannen" />
			</View>
			<View style={styles.fixedBottomButton}>
				<Button
					onPress={() => {
						setPrintModalOpen(true);
					}}
					title="Neue QR-Codes erstellen"
				/>
				<Button title="Barcode scannen" onPress={() => navigation.navigate("ScanPage", { onResult: () => {} })} />
			</View>
			<QRGeneratorModal modalVisible={printModalOpen} setModalVisible={setPrintModalOpen} />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	fixedBottomButton: {
		position: "absolute",
		left: 12,
		bottom: 12,
		width: "100%",
	},
});
