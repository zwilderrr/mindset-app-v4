import { FocusType, IntentionType } from "@app/types";

function uuidv4() {
	return Math.ceil(Math.random() * 1000000000000000).toString();
}

function getRandomEl<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

const COLORS = ["#AF165E", "#EE092D", "#FF6302", "#FFBD27", "#FFE72B"];

export function baseFocus(): FocusType {
	return {
		id: uuidv4(),
		title: "",
		color: getRandomEl(COLORS),

		intentions: [],

		activeRangeStart: 540,
		activeRangeEnd: 1080,
		activeDays: [1, 2, 3, 4, 5],

		// lastCompletedDay: ,

		target: 6,
		activations: 0,

		currentStreak: 0,
		bestStreak: 0,

		intentionActivations: 0,
		focusActivations: 0,

		showConfetti: true,
		notify: true,
	};
}

export function baseIntention(): IntentionType {
	return {
		id: uuidv4(),
		title: "",
		emoji: "",
		notes: "",
		defaultsToActive: false,
		active: false,
	};
}
