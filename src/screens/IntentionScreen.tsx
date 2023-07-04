import {
	ActionBar,
	Avatar,
	Card,
	Colors,
	Drawer,
	Text,
	TextField,
	TouchableOpacity,
	View,
} from "react-native-ui-lib";
import {
	Keyboard,
	Platform,
	Switch as RNSwitch,
	StyleSheet,
} from "react-native";
import {
	ScrollView,
	TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { IntentionType } from "@app/types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { baseIntention } from "@app/dataUtils";
import { useGetFocus } from "@app/hooks/useGetFocus";
import { useMindset } from "@app/providers/MindsetProvider";

const drag = require("@app/assets/drag.png");

export default function IntentionScreen() {
	const focus = useGetFocus();
	const [editing, setEditing] = useState<IntentionType | undefined>();
	const idRef = useRef("");
	const [intentionsFromState, setIntentionsFromState] = useState(
		focus.intentions
	);

	const { addIntention } = useMindset();

	useEffect(() => {
		const keyboardDidHideListener = Keyboard.addListener(
			"keyboardDidHide",
			() => {
				setEditing(undefined);
			}
		);

		return () => {
			keyboardDidHideListener.remove();
		};
	}, []);

	useEffect(() => {
		setIntentionsFromState(focus.intentions);
	}, [JSON.stringify(focus.intentions)]);

	function handleOnPressIn(intention: IntentionType) {
		idRef.current = intention.id;
		setEditing(intention);
	}

	function handlePressAdd() {
		addIntention(focus);
	}

	return (
		<>
			<Text>{focus.title}</Text>
			<KeyboardAwareScrollView contentInsetAdjustmentBehavior="automatic">
				{intentionsFromState.map((intentionFromState, idx) => {
					const isEditing = intentionFromState.id === editing?.id;
					return (
						<Drawer
							key={intentionFromState.id}
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
							<Card flex row spread padding-s4 margin-s2 bg-white>
								<TouchableOpacity activeOpacity={1} row>
									<Avatar
										label={
											intentionFromState.emoji || intentionFromState.title[0]
										}
										// update this logic to trigger a hidden text field
										// onPress={() => handlePressIntention(intention)}
									/>
									{/* <HiddenTextField /> */}
									<View>
										{/* intention */}
										<TextField
											placeholder="intention"
											value={intentionFromState.title}
											onPressIn={() => handleOnPressIn(intentionFromState)}
											onChangeText={nextTitle => {
												setIntentionsFromState(intentions => {
													const nextIntentionsFromState = [...intentions];
													nextIntentionsFromState[idx].title = nextTitle;
													return nextIntentionsFromState;
												});
											}}
										/>

										{/* notes */}
										{(intentionFromState.notes || isEditing) && (
											<TextField
												placeholder="notes"
												value={intentionFromState.notes}
												onPressIn={() => handleOnPressIn(intentionFromState)}
												onChangeText={nextNote => {
													setIntentionsFromState(intentions => {
														const nextIntentionsFromState = [...intentions];
														nextIntentionsFromState[idx].notes = nextNote;
														return nextIntentionsFromState;
													});
												}}
											/>
										)}
									</View>
								</TouchableOpacity>
								<RNSwitch value={intentionFromState.active} />
							</Card>
						</Drawer>
					);
				})}
			</KeyboardAwareScrollView>

			<ActionBar
				actions={[
					{
						label: "Add",
						iconSource: drag,
						iconStyle: { height: 26, resizeMode: "contain" },
						onPress: handlePressAdd,
					},
					{ label: "" },
				]}
			/>
		</>
	);
}

// {nextIntention && (
// 	<Card flex row spread padding-s4 margin-s2 bg-white>
// 		<View row>
// 			{/* emoji */}
// 			<Avatar label={nextIntention.emoji || nextIntention.title[0]} />

// 			<View>
// 				{/* intention */}
// 				<TextField
// 					ref={addTitleRef}
// 					placeholder="intention"
// 					value={nextIntention.title}
// 					onBlur={handleBlur}
// 					onChangeText={title => {
// 						setNextIntention(i => {
// 							if (nextIntention) {
// 								return { ...nextIntention, title };
// 							}
// 						});
// 					}}
// 				/>
// 				{/* notes */}
// 				<TextField
// 					ref={addNotesRef}
// 					value={nextIntention.notes}
// 					placeholder="notes"
// 					onBlur={handleBlur}
// 					onChangeText={notes => {
// 						setNextIntention(i => {
// 							if (nextIntention) {
// 								return { ...nextIntention, notes };
// 							}
// 						});
// 					}}
// 				/>
// 			</View>
// 		</View>
// 		<RNSwitch disabled />
// 	</Card>
// )}
