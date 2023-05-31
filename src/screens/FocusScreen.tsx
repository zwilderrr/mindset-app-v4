import {
	Button,
	Drawer,
	Text,
	TouchableOpacity,
	View,
} from "react-native-ui-lib";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { ScrollView } from "react-native-gesture-handler";
import { useMindset } from "@app/providers/MindsetProvider";

export default function FocusScreen() {
	const { navigate } = useNavigation();
	const { focuses } = useMindset();

	return (
		<>
			<ScrollView contentInsetAdjustmentBehavior="automatic">
				{focuses.map(focus => {
					return (
						<Drawer key={focus.id}>
							<TouchableOpacity
								onPress={() =>
									navigate("intention-screen", {
										focusId: focus.id,
									})
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
			<TestButtons />
		</>
	);
}

export function TestButtons() {
	const { clearData, seedData } = useMindset();

	return (
		<View absH absB height={100}>
			<TouchableOpacity onPress={clearData}>
				<Text>Clear data</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={seedData}>
				<Text>Seed data</Text>
			</TouchableOpacity>
		</View>
	);
}
