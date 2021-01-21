import { Action } from "easy-peasy";

interface InitialStoreState {
	currentTheme: string;
}

type theme = InitialStoreState["currentTheme"];
export interface StoreModel extends InitialStoreState {
	setCurrentTheme: Action<StoreModel, theme>;
}
