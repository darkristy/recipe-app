let accessToken = "";

const setAccessToken = (s: string) => {
	accessToken = s;
};
const getAccessToken = () => accessToken;

export { setAccessToken, getAccessToken };
