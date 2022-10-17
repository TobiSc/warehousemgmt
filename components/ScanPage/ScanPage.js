import { useEffect, useState } from "react";
import { View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { GlobalStyle } from "../GlobalStyle";
import { useObject, useQuery, useRealm } from "../../db/Schemes";

export default function ScanPage({ route, navigation }) {
	const { onResult } = route.params || {};
	if (!onResult) navigation.goBack();
	const [hasPermission, setHasPermission] = useState(false);
	const [key, setKey] = useState(0);
	const realm = useRealm();

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
		const entity = realm.objects("Entity").find((e) => e.id === data);
		setKey(key + 1);
		if (entity) {
			onResult(entity.id);
		} else {
			navigation.navigate("NewEntity", { id: data, onCreated: onResult });
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
