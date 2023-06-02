import {
	Button,
	Colors,
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
						<Drawer
							key={focus.id}
							rightItems={[
								{
									text: "Read",
									background: Colors.blue30,
									onPress: () => console.log("read pressed"),
								},
								{
									text: "Read",
									background: Colors.blue30,
									onPress: () => console.log("read pressed"),
								},
							]}
							leftItem={{
								text: "Delete",
								background: Colors.red30,
								onPress: () => console.log("delete pressed"),
							}}
						>
							<TouchableOpacity
								activeOpacity={1}
								onPress={() =>
									navigate("intention-screen", {
										focusId: focus.id,
									})
								}
							>
								<View centerV padding-s4 bg-white style={{ height: 60 }}>
									<Text>{focus.title}</Text>
								</View>
							</TouchableOpacity>
						</Drawer>
					);
				})}
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
