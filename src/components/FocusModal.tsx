import { Modal, ModalProps } from "@app/components/Modal";
import { Text, TextField } from "react-native-ui-lib";

import { FocusType } from "@app/types";

type FocusModalProps = {
	nextFocus?: FocusType;
} & Omit<ModalProps, "title" | "children">;

export function FocusModal({
	nextFocus,
	modalOpen,
	onCancel,
	onDone,
}: FocusModalProps) {
	return (
		<Modal
			title="Add Focus"
			modalOpen={modalOpen}
			onCancel={onCancel}
			onDone={onDone}
		>
			{/*
						left off here. you have the modal skeleton. next move is to make a FocusModal
						that accepts a focus that's either a baseFocus, or the one to edit.

						to consider - when adding a focus, actually add the focus but don't show it in the
						list on screen until "Done" is pressed. this way it's the same api whether you're
						adding or editing. The only thing that changes is the title of the modal, and what happens
						onCancel (when "adding", its deleted, when "editing" the changes are discarded), and whether
						the Delete button is shown.

				*/}
			<TextField value={nextFocus?.title} />
		</Modal>
	);
}
