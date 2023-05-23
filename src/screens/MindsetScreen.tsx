import { Button, StyleSheet, Text, View } from "react-native";
import { useCallback, useEffect } from "react";
import {
	useFocusEffect,
	useIsFocused,
	useNavigation,
} from "@react-navigation/native";

import { useAsyncStorage } from "../hooks/useAsyncStorage";

export default function MindsetScreen() {
	const [number, updateNumber] = useAsyncStorage("number", 0);

	return (
		<View style={styles.container}>
			<Text>Mindset screen</Text>
			<Button
				title={number.toString()}
				onPress={() => updateNumber(number + 1)}
			/>
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