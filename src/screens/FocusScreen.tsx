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

import { FocusModal } from "@app/components/FocusModal";
import { FocusType } from "@app/types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Modal } from "@app/components/Modal";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { baseFocus } from "@app/dataUtils";
import { useMindset } from "@app/providers/MindsetProvider";
import { useState } from "react";

const drag = require("@app/assets/drag.png");

export default function FocusScreen() {
	const { navigate } = useNavigation();
	const { focuses, addFocus, deleteFocus } = useMindset();
	const [modalOpen, setModalOpen] = useState(false);
	const [nextFocus, setNextFocus] = useState<FocusType | undefined>();
	const [isAdding, setIsAdding] = useState(false);

	async function handleAddFocus() {
		const nextFocus = baseFocus();
		await addFocus(nextFocus);
		setNextFocus(nextFocus);
		setModalOpen(true);
		setIsAdding(true);
	}

	async function handleOnCancel() {
		setModalOpen(false);

		if (nextFocus && isAdding) {
			// errors. check if removed from focus order?
			deleteFocus(nextFocus.id);
		}
		setNextFocus(undefined);
		setIsAdding(false);
	}

	function handleOnDone() {
		setModalOpen(false);
		setIsAdding(false);
	}

	function handleEditFocus(focus: FocusType) {}

	return (
		<>
			<KeyboardAwareScrollView contentInsetAdjustmentBehavior="automatic">
				{focuses.map(focus => {
					return (
						<Drawer
							key={focus.id}
							rightItems={[
								{
									text: "Delete",
									background: Colors.transparent,
									onPress: deleteFocus(focus.id),
								},
								{
									text: "Archive",
									background: Colors.transparent,
									onPress: () => console.log("archive pressed"),
								},
							]}
							leftItem={{
								text: "Edit",
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

			<FocusModal
				modalOpen={modalOpen}
				onCancel={handleOnCancel}
				onDone={handleOnDone}
				nextFocus={nextFocus}
			/>

			<ActionBar
				actions={[
					{
						label: "Add focus",
						iconStyle: { height: 26, resizeMode: "contain" },
						onPress: handleAddFocus,
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
		<View absH absB marginB-150>
			<TouchableOpacity onPress={clearData} style={{ marginBottom: 10 }}>
				<Text>Clear data</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={seedData}>
				<Text>Seed data</Text>
			</TouchableOpacity>
		</View>
	);
}
