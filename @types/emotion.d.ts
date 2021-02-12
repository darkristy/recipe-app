import "@emotion/react";

declare module "@emotion/react" {
	export interface Theme {
		fonts: {
			body: string;
			heading: string;
			mono: string;
		};
		fontWeights: {
			normal: number;
			medium: number;
			bold: number;
		};
		primary: string;
		secondary: string;
		tiertiary: string;
		quaternary: string;
		quinary: string;
		accent: string;
	}
}
