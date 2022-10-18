import { useEffect, useState } from "react";
import { Vibration, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { GlobalStyle } from "../GlobalStyle";
import { useObject, useQuery, useRealm } from "../../db/Schemes";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ScanPage({ route, navigation }) {
	const { onResult, mode } = route.params || {};
	if (!onResult) navigation.goBack();
	const [hasPermission, setHasPermission] = useState(false);
	const [key, setKey] = useState(0);
	const realm = useRealm();
	const [vibration, setVibration] = useState(true);

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
		AsyncStorage.getItem("settings", (e, s) => {
			if (s) setVibration(JSON.parse(s).vibration);
		});
	}, []);

	const onScanned = ({ type, data }) => {
		if (vibration) {
			Vibration.vibrate(50);
		}
		const entity = realm.objects("Entity").find((e) => e.id === data);
		setKey(key + 1);
		if (entity) {
			onResult(entity.id);
			if (mode === ScanModes.Single) {
				navigation.goBack();
			}
		} else {
			if (mode === ScanModes.Single) {
				navigation.replace("NewEntity", { id: data, onCreated: onResult });
			} else {
				navigation.navigate("NewEntity", { id: data, onCreated: onResult });
			}
		}
	};

	return (
		<View style={GlobalStyle.viewContainer}>
			{hasPermission && (
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

export const ScanModes = {
	Single: "single",
	Multiple: "multiple",
};
