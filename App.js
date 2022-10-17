import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "./components/LandingPage/LandingPage";
import ScanPage from "./components/ScanPage/ScanPage";
import NewEntity from "./components/NewEntity/NewEntity";
import { RealmContext } from "./db/Schemes";
import EntityDetails from "./components/Entity/EntityDetails";

const Stack = createNativeStackNavigator();

const { RealmProvider } = RealmContext;

export default function App() {
	return (
		<RealmProvider>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="LandingPage">
					<Stack.Screen name="LandingPage" component={LandingPage} options={{ title: "Startseite" }} />
					<Stack.Screen name="ScanPage" component={ScanPage} />
					<Stack.Screen name="NewEntity" component={NewEntity} options={{ title: "Neue Entität" }} />
					<Stack.Screen name="Entity" component={EntityDetails} options={{ title: "Entität" }} />
				</Stack.Navigator>
			</NavigationContainer>
		</RealmProvider>
	);
}
