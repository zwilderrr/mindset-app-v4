import { Button, Drawer, Text, TouchableOpacity } from "react-native-ui-lib";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { ScrollView } from "react-native-gesture-handler";
import { useMindset } from "@app/providers/IntentionProvider";

export default function FocusScreen() {
	const { navigate } = useNavigation();
	const { focuses } = useMindset();

	return (
		<ScrollView contentInsetAdjustmentBehavior="automatic">
			{focuses.map(focus => {
				return (
					<Drawer>
						<TouchableOpacity
							onPress={() =>
								navigate("intention-screen", { params: { focusId: focus.id } })
							}
						>
							<Text>{focus.title}</Text>
						</TouchableOpacity>
					</Drawer>
				);
			})}

			<Button
				onPress={() =>
					navigate("intention-screen", {
						params: { focusId: "this-is-a-focus-id" },
					})
				}
				label="intention screen"
			/>
		</ScrollView>
	);
}
