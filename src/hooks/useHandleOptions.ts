import { useState } from "react";

interface HandleOptionsArgs {
	defaultOptions: any[];
}

export const useHandleOptions = (
	defaultOptions: HandleOptionsArgs["defaultOptions"]
): {
	handleCreate: (inputValue: any) => void;
	loading: boolean;
	options: any[];
} => {
	const [loading, setLoading] = useState(false);
	const [options, setOptions] = useState([]);

	const optionList = [];

	if (defaultOptions) {
		for (const option of defaultOptions) {
			optionList.push({
				label: option.name,
				value: option.name,
			});
		}
	}

	if (optionList && options.length === 0) {
		options.push(...optionList);
	}

	const createOption = (label: string): { label: string; value: string } => ({
		label,
		value: label,
	});

	const handleCreate = (inputValue: any): void => {
		setLoading(true);

		setTimeout(() => {
			const newOption = createOption(inputValue);
			console.log(newOption);
			setOptions([...options, newOption]);
			setLoading(false);
		}, 1000);
	};

	return {
		handleCreate,
		loading,
		options,
	};
};
