import {
	Avatar,
	Card,
	Colors,
	Drawer,
	TextField,
	TouchableOpacity,
	View,
} from "react-native-ui-lib";
import { FocusType, IntentionType } from "@app/types";
import { Switch as RNSwitch, TextInput as RNTextInput } from "react-native";

import { useRef } from "react";

type IntentionProps = {
	intention: IntentionType;
	isEditing: boolean;
	disableSwitch: boolean;
	idx: number;
	handleOnPressIn(intention: IntentionType): void;
	setFocus: React.Dispatch<React.SetStateAction<FocusType>>;
};

export function Intention({
	intention,
	isEditing,
	disableSwitch,
	idx,
	handleOnPressIn,
	setFocus,
}: IntentionProps) {
	const avatarRef = useRef(null);

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
			<Card flex row spread padding-s4 margin-s2 bg-white>
				<TouchableOpacity activeOpacity={1} row>
					<Avatar
						label={intention.emoji || intention.title[0]}
						onPress={() => {
							avatarRef?.current?.focus();
							handleOnPressIn(intention);
						}}
					/>
					{/* RNUI Lib's TextField hides the other TextField's when `display: "none"`  */}
					<RNTextInput
						ref={avatarRef}
						style={{ display: "none" }}
						value=""
						onChangeText={nextEmoji => {
							setFocus(f => {
								const nextFocus = { ...f };
								nextFocus.intentions[idx].emoji = nextEmoji;
								return nextFocus;
							});
						}}
					/>
					<View>
						{/* intention */}
						<TextField
							placeholder="intention"
							value={intention.title}
							onPressIn={() => handleOnPressIn(intention)}
							onChangeText={nextTitle => {
								setFocus(f => {
									const nextFocus = { ...f };
									nextFocus.intentions[idx].title = nextTitle;
									return nextFocus;
								});
							}}
							// onChangeText={nextTitle => {
							// 	setIntentions(intentions => {
							// 		const nextIntentionsFromState = [...intentions];
							// 		nextIntentionsFromState[idx].title = nextTitle;
							// 		return nextIntentionsFromState;
							// 	});
							// }}
						/>

						{/* notes */}
						{(intention.notes || isEditing) && (
							<TextField
								placeholder="notes"
								value={intention.notes}
								onPressIn={() => handleOnPressIn(intention)}
								onChangeText={nextNotes => {
									setFocus(f => {
										const nextFocus = { ...f };
										nextFocus.intentions[idx].notes = nextNotes;
										return nextFocus;
									});
								}}
								// onChangeText={nextNote => {
								// 	setIntentions(intentions => {
								// 		const nextIntentionsFromState = [...intentions];
								// 		nextIntentionsFromState[idx].notes = nextNote;
								// 		return nextIntentionsFromState;
								// 	});
								// }}
							/>
						)}
					</View>
				</TouchableOpacity>
				<RNSwitch
					value={intention.active}
					disabled={Boolean(disableSwitch)}
					onValueChange={nextActive => {
						setFocus(f => {
							const nextFocus = { ...f };
							nextFocus.intentions[idx].active = nextActive;
							return nextFocus;
						});
					}}
				/>
			</Card>
		</Drawer>
	);
}
