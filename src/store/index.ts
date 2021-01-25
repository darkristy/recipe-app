import { action, createStore } from "easy-peasy";

import { StoreModel } from "./storeModel";

const currentTheme = (): string => {
	if (typeof window !== "undefined") {
		return window.localStorage.getItem("theme") == null ? "light" : window.localStorage.getItem("theme");
	}
};

const store: StoreModel = {
	currentTheme: currentTheme(),
	loading: false,

	setCurrentTheme: action((state, payload) => {
		state.currentTheme = payload;
	}),
	setLoading: action((state, payload) => {
		state.loading = payload;
	}),
};

export default createStore(store);
