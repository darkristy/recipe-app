import { Action } from "easy-peasy";

interface InitialStoreState {
	currentTheme: string;
	loading: boolean;
}

type theme = InitialStoreState["currentTheme"];
export interface StoreModel extends InitialStoreState {
	setCurrentTheme: Action<StoreModel, theme>;
	setLoading: Action<StoreModel, boolean>;
}
