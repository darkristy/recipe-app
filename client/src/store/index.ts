import { action, createStore } from "easy-peasy";

import { StoreModel } from "../models";

const currentTheme = (): string => {
	if (typeof window !== "undefined") {
		return window.localStorage.getItem("theme") == null ? "light" : window.localStorage.getItem("theme");
	}
};

const store: StoreModel = {
	currentTheme: currentTheme(),

	setCurrentTheme: action((state, payload) => {
		state.currentTheme = payload;
	}),
};

export default createStore(store);
