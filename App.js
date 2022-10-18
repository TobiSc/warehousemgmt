import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "./components/LandingPage/LandingPage";
import ScanPage from "./components/ScanPage/ScanPage";
import NewEntity from "./components/Entity/NewEntity";
import { RealmContext } from "./db/Schemes";
import EntityDetails from "./components/Entity/EntityDetails";
import QRGenerator from "./components/QRGenerator/QRGenerator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Settings from "./components/Settings/Settings";
import { Button, Icon } from "@rneui/themed";
import { Pressable } from "react-native";

const Stack = createNativeStackNavigator();

const { RealmProvider } = RealmContext;

export default function App() {
	return (
		<SafeAreaProvider>
			<RealmProvider>
				<NavigationContainer>
					<Stack.Navigator initialRouteName="LandingPage">
						<Stack.Screen
							name="LandingPage"
							component={LandingPage}
							options={({ navigation }) => ({
								title: "Startseite",
								headerRight: () => (
									<Pressable onPress={() => navigation.navigate("Settings")}>
										<Icon name="settings" color="gray" />
									</Pressable>
								),
							})}
						/>
						<Stack.Screen name="ScanPage" component={ScanPage} />
						<Stack.Screen name="NewEntity" component={NewEntity} options={{ title: "Neue Entität" }} />
						<Stack.Screen name="EntityDetails" component={EntityDetails} options={{ title: "Entität" }} />
						<Stack.Screen name="QRGenerator" component={QRGenerator} options={{ title: "Neue QR-Codes drucken" }} />
						<Stack.Screen name="Settings" component={Settings} options={{ title: "Einstellungen" }} />
					</Stack.Navigator>
				</NavigationContainer>
			</RealmProvider>
		</SafeAreaProvider>
	);
}
