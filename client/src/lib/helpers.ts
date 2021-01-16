const getToken = (): string => {
	if (typeof window !== "undefined") {
		return window.localStorage.getItem("jid");
	}
};

const saveToken = (token): void => {
	if (typeof window !== "undefined") {
		return window.localStorage.setItem("jid", token);
	}
};

const clearToken = (): void => {
	if (typeof window !== "undefined") {
		return window.localStorage.removeItem("jid");
	}
};

export { getToken, saveToken, clearToken };
