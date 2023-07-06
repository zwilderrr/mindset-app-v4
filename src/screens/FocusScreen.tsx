import {
	ActionBar,
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
import { Modal } from "@app/components/Modal";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useMindset } from "@app/providers/MindsetProvider";
import { useState } from "react";

const drag = require("@app/assets/drag.png");

export default function FocusScreen() {
	const { navigate } = useNavigation();
	const { focuses } = useMindset();
	const [modalOpen, setModalOpen] = useState(false);

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

			<Modal
				title="Add Focus"
				modalOpen={modalOpen}
				onCancel={() => setModalOpen(false)}
				onDone={() => setModalOpen(false)}
			>
				<Text>hey</Text>
			</Modal>

			<ActionBar
				actions={[
					{
						label: "Add focus",
						iconStyle: { height: 26, resizeMode: "contain" },
						onPress: () => setModalOpen(true),
					},
					{ label: "" },
				]}
			/>

			<TestButtons />
		</>
	);
}

export function TestButtons() {
	const { clearData, seedData } = useMindset();

	return (
		<View absH absB height={150} style={{ zIndex: -1 }}>
			<TouchableOpacity onPress={clearData} style={{ marginBottom: 10 }}>
				<Text>Clear data</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={seedData}>
				<Text>Seed data</Text>
			</TouchableOpacity>
		</View>
	);
}
