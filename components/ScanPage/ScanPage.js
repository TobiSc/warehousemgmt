import { get } from "lodash";
import { useEffect, useState } from "react";
import { Button, FlatList, Modal, StyleSheet, Text, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { GlobalStyle } from "../GlobalStyle";
import { useIsFocused } from "@react-navigation/native";
import { Entity, useQuery, useRealm } from "../../db/Schemes";

export default function ScanPage({ route, navigation }) {
	const [hasPermission, setHasPermission] = useState(false);
	const [key, setKey] = useState(0);
	const isFocused = useIsFocused();
	const [entityIds, setEntityIds] = useState([]);
	const realm = useRealm();
	const query = useQuery("Entity");

	useEffect(() => {
		const requestPermissions = async () => {
			if (!hasPermission) {
				const { status } = await BarCodeScanner.requestPermissionsAsync();
				if (status === "granted") {
					setHasPermission(true);
				} else {
					return;
				}
			}
		};
		requestPermissions();
	}, []);

	const onScanned = ({ type, data }) => {
		const isNew = query.filtered(`id == "${data}"`).isEmpty();
		console.log("exists:", !isNew);
		console.log("entities scanned: ", [...new Set([...entityIds, data])]);
		setEntityIds([...new Set([...entityIds, data])]);
		setKey(key + 1);
		if (isNew) {
			navigation.navigate("NewEntity", { id: data });
		}
	};

	return (
		<View style={GlobalStyle.viewContainer}>
			{hasPermission && isFocused && (
				<BarCodeScanner
					key={key}
					style={{ height: "100%", width: "100%" }}
					barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
					onBarCodeScanned={onScanned}
				/>
			)}
		</View>
	);
}
