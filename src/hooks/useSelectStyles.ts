import { useTheme } from "@emotion/react";
import { GroupTypeBase, Styles } from "react-select";

export const useSelectStyles = (): {
	customSelectStyles: Partial<Styles<any, false, GroupTypeBase<any>>>;
} => {
	const theme = useTheme();

	const customSelectStyles: Partial<Styles<any, false, GroupTypeBase<any>>> = {
		menu: (provided, state) => ({
			...provided,
			backgroundColor: theme.quinary,
			color: theme.tiertiary,
			fontWeight: 500,
		}),
		control: (provided) => ({
			...provided,
			backgroundColor: theme.quinary,
			border: "none",
		}),

		indicatorsContainer: (provided) => ({
			...provided,
			display: "none",
		}),

		valueContainer: (provided, state) => ({
			...provided,
			padding: "0 6px",
		}),

		singleValue: (provided, state) => ({
			...provided,
			color: theme.tiertiary,
			fontWeight: 500,
		}),
		placeholder: (provided, state) => ({
			...provided,
			color: theme.tiertiary,
			fontWeight: 500,
			opacity: 0.63,
		}),

		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isFocused ? "rgba(206, 75, 46, 0.15)" : state.data.color,
		}),
		container: (provided, state) => {
			const {
				selectProps: { width },
			} = state;

			return {
				...provided,
				width: width ? width : "100%",
				height: "100%",
				fontFamily: theme.fonts.body,
			};
		},
	};

	return {
		customSelectStyles,
	};
};
