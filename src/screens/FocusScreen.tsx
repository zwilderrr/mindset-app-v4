import { Drawer, Text } from "react-native-ui-lib";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { ScrollView } from "react-native-gesture-handler";

export default function FocusScreen() {
	const navigation = useNavigation();

	return (
		<ScrollView contentInsetAdjustmentBehavior="automatic">
			<Drawer>
				<Text>heyy</Text>
			</Drawer>
		</ScrollView>
	);
}
