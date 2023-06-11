import {
	Button,
	Card,
	Colors,
	Drawer,
	Text,
	TouchableOpacity,
	View,
} from "react-native-ui-lib";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";
import { useMindset } from "@app/providers/MindsetProvider";

export default function FocusScreen() {
	const { navigate } = useNavigation();
	const { focuses } = useMindset();

	return (
		<>
			<KeyboardAwareScrollView contentInsetAdjustmentBehavior="automatic">
				{focuses.map(focus => {
					return (
						<Drawer
							key={focus.id}
							rightItems={[
								{
									text: "Read",
									background: Colors.transparent,
									onPress: () => console.log("read pressed"),
								},
								{
									text: "Read",
									background: Colors.transparent,
									onPress: () => console.log("read pressed"),
								},
							]}
							leftItem={{
								text: "Delete",
								background: Colors.transparent,
								onPress: () => console.log("delete pressed"),
							}}
						>
							<Card
								flex
								row
								spread
								padding-s4
								margin-s2
								bg-white
								style={{ height: 60 }}
								onPress={() =>
									navigate("intention-screen", {
										focusId: focus.id,
									})
								}
							>
								<Text>{focus.title}</Text>
							</Card>
						</Drawer>
					);
				})}
			</KeyboardAwareScrollView>
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
