import { StyleSheet, Text, View } from "react-native";

export default function MetricScreen() {
	return (
		<View style={styles.container}>
			<Text>Metrics screen</Text>
		</View>
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
