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
import { Switch as RNSwitch, StyleSheet, Text } from "react-native";
import {
	ScrollView,
	TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useGetFocus } from "@app/hooks/useGetFocus";
import { useMindset } from "@app/providers/MindsetProvider";
import { useState } from "react";

const drag = require("@app/assets/drag.png");

export default function IntentionScreen() {
	const focus = useGetFocus();
	const [isAdding, setIsAdding] = useState(false);

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
							<Card flex row spread padding-s4 bg-white style={{ height: 60 }}>
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
						flex
						row
						spread
						padding-s4
						bg-white
						style={{ height: 60, borderWidth: 1, borderColor: Colors.grey1 }}
					>
						{/* emoji */}
						<Avatar label="I" />

						{/* intention */}
						<TextField
							placeholder="intention"
							onBlur={e => {
								// add to intentions
								// consider adding logic to test what else they've clicked on in order to exit early
								setIsAdding(false);
								console.log(e.target);
							}}
						/>
						{/* notes */}
						<TextField
							placeholder="notes"
							onBlur={e => {
								// add to intentions
								// consider adding logic to test what else they've clicked on in order to exit early
								setIsAdding(false);
								console.log(e.target);
							}}
						/>
						<TextField />
					</Card>
				)}
			</ScrollView>

			<ActionBar
				actions={[
					{
						label: "Add",
						iconSource: drag,
						iconStyle: { height: 26, resizeMode: "contain" },
						onPress: () => !isAdding && setIsAdding(true),
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
