import { Button, StyleSheet, Text, View } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { useAsyncStorage } from "../hooks/useAsyncStorage";

export default function IntentionScreen() {
	const [number, updateNumber] = useAsyncStorage("number", 0);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text>Intention screen</Text>
			<Button
				title={number.toString()}
				onPress={() => updateNumber(number + 1)}
			/>
		</ScrollView>
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
