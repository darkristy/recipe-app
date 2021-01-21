import React from "react";
import * as jwt from "jsonwebtoken";

const RequireAuth = (Component): any =>
	class extends React.Component {
		static getInitialProps(ctx): any {
			let isAuthenticated;
			const token = ctx.req.headers.cookie?.replace("userToken=", "");

			try {
				isAuthenticated = jwt.verify(token, process.env.SECRET);
			} catch (e) {
				console.log(e);
			}

			// Use !isAuthenticated for error cases
			if (isAuthenticated?.user) {
				return Component.getInitialProps(ctx);
			} else {
				ctx.res.redirect("/");
			}
		}

		render(): JSX.Element {
			return <Component {...this.props} />;
		}
	};

export default RequireAuth;
