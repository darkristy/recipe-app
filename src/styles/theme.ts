import { colors, fonts } from "../utils/variables";

const light = {
	primary: colors.lightPrimary,
	secondary: colors.lightSecondary,
	tiertiary: colors.lightTertiary,
	quaternary: colors.lightQuaternary,
	accent: colors.accent,
};

const dark = {
	primary: colors.darkPrimary,
	secondary: colors.darkSecondary,
	tiertiary: colors.darkTertiary,
	quaternary: colors.darkQuaternary,
	accent: colors.accent,
};

const config = {
	fonts: {
		body: fonts.secondaryFont,
		heading: fonts.primaryFont,
		mono: "Menlo, monospace",
	},
	fontWeights: {
		normal: 400,
		medium: 600,
		bold: 700,
	},
	spacing: {
		safeTop: "env(safe-area-inset-top)",
		safeBottom: "env(safe-area-inset-bottom)",
		safeLeft: "env(safe-area-inset-left)",
		safeRight: "env(safe-area-inset-right)",
	},
};

const darkTheme = { ...dark, ...config };
const lightTheme = { ...light, ...config };

export { darkTheme, lightTheme };
