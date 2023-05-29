import { StyleSheet, Text, View } from "react-native";

import FocusScreen from "./src/screens/FocusScreen";
import IntentionScreen from "./src/screens/IntentionScreen";
import MetricScreen from "./src/screens/MetricScreen";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<>
			<StatusBar style="auto" />
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{ headerLargeTitle: true, headerShadowVisible: false }}
				>
					<Stack.Screen
						name="focus-screen"
						component={FocusScreen}
						options={{ title: "Focuses", headerSearchBarOptions: {} }}
					/>

					<Stack.Screen name="intention-screen" component={IntentionScreen} />

					<Stack.Screen
						name="metrics-screen"
						component={MetricScreen}
						options={{
							headerBackVisible: false,
							title: "Metrics",
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
