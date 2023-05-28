import { Button, StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { useAsyncStorage } from "../hooks/useAsyncStorage";
import { useEffect } from "react";

export default function FocusScreen() {
	const [number, updateNumber] = useAsyncStorage("number", 0);
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<Text>Focuses screen</Text>
			<Button
				title={number.toString()}
				onPress={() => updateNumber(number + 1)}
			/>

			<Button
				title="Go to intention"
				onPress={() => {
					navigation.navigate("intention-screen");
				}}
			/>
			<Button title="reset" onPress={() => updateNumber(0)} />
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
