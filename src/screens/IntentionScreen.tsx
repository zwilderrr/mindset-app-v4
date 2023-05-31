import { StyleSheet, Text } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { useGetFocus } from "@app/hooks/useGetFocus";

export default function IntentionScreen() {
	const focus = useGetFocus();

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text>hey</Text>
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
