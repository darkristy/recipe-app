const CLIENT_URL =
	process.env.NODE_ENV === "production" ? "https://recipe-app.darkristy.vercel.app" : "http://localhost:3000";

const Validation = {
	email: "Must be a valid email address.",
	username: "Must be longer than 4 characters.",
	password: "Must be at least 6 characters",
};

export { CLIENT_URL, Validation };
