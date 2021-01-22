import { useState } from "react";

const useTogglePasswordVisiblity = (): {
	passwordShown: boolean;
	togglePasswordVisiblity: void;
} => {
	const [passwordShown, setPasswordShown] = useState(false);
	return {
		passwordShown,
		togglePasswordVisiblity: setPasswordShown(passwordShown ? false : true),
	};
};

export default useTogglePasswordVisiblity;
