/* eslint-disable react/no-danger */
import Document, { Head, Main, NextScript, Html } from "next/document";
import { extractCritical } from "@emotion/server";

export default class MyDocument extends Document {
	static async getInitialProps(
		ctx: any
	): Promise<{
		styles: JSX.Element;
		html: string;
		head?: JSX.Element[];
	}> {
		const initialProps = await Document.getInitialProps(ctx);
		const styles = extractCritical(initialProps.html);
		return {
			...initialProps,
			styles: (
				<>
					{initialProps.styles}
					<style data-emotion-css={styles.ids.join(" ")} dangerouslySetInnerHTML={{ __html: styles.css }} />
				</>
			),
		};
	}

	render(): JSX.Element {
		return (
			<Html lang="en">
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
