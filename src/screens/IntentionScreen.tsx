<<<<<<< Updated upstream
import { StyleSheet, Text } from "react-native";
=======
import {
	ActionBar,
	Avatar,
	Card,
	Colors,
	Drawer,
	TextField,
	TouchableOpacity,
	View,
} from "react-native-ui-lib";
import {
	KeyboardAvoidingView,
	Platform,
	Switch as RNSwitch,
	StyleSheet,
	Text,
} from "react-native";
import {
	ScrollView,
	TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
>>>>>>> Stashed changes

import { baseIntention } from "@app/dataUtils";
import { useGetFocus } from "@app/hooks/useGetFocus";
<<<<<<< Updated upstream
=======
import { useMindset } from "@app/providers/MindsetProvider";

const drag = require("@app/assets/drag.png");
>>>>>>> Stashed changes

export default function IntentionScreen() {
	const focus = useGetFocus();
	const { addIntention } = useMindset();
	const [isAdding, setIsAdding] = useState(false);
	const [nextIntention, setNextIntention] = useState(baseIntention());
	const titleRef = useRef(null);
	const notesRef = useRef(null);

	useEffect(() => {
		if (isAdding) {
			titleRef?.current?.focus();
		} else {
			setNextIntention(baseIntention());
		}
	}, [isAdding]);

	function handleBlur() {
		if (titleRef?.current?.isFocused() || notesRef?.current?.isFocused()) {
			return;
		}
		addIntention(focus, nextIntention);
		setIsAdding(false);
	}

	return (
		<>
			<Text>{focus.title}</Text>
			<ScrollView contentInsetAdjustmentBehavior="automatic">
				{focus.intentions.map(intention => {
					return (
						<Drawer
							key={intention.id}
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
							>
								<Avatar label={intention.emoji || intention.title[0]} />
								<TouchableOpacity activeOpacity={1}>
									<Text>{intention.title}</Text>
									<Text>{intention.notes}</Text>
								</TouchableOpacity>
								<RNSwitch value={intention.active} />
							</Card>
						</Drawer>
					);
				})}
				{isAdding && (
					<Card
						row
						padding-s4
						bg-white
						spread
						style={{ height: 60, borderWidth: 1, borderColor: Colors.grey1 }}
					>
						<View row>
							{/* emoji */}
							<Avatar label={nextIntention.emoji || nextIntention.title[0]} />

							{/* intention */}
							<TextField
								ref={titleRef}
								placeholder="intention"
								value={nextIntention.title}
								onChangeText={title => setNextIntention(i => ({ ...i, title }))}
								onBlur={handleBlur}
							/>
							{/* notes */}
							<TextField
								ref={notesRef}
								placeholder="notes"
								onBlur={handleBlur}
							/>
							<TextField />
						</View>
						<RNSwitch disabled />
					</Card>
				)}
			</ScrollView>

			<ActionBar
				actions={[
					{
						label: "Add",
						iconSource: drag,
						iconStyle: { height: 26, resizeMode: "contain" },
						onPress: () => {
							if (!isAdding) {
								setIsAdding(true);
							}
						},
					},
					{ label: "" },
				]}
			/>
		</>
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
