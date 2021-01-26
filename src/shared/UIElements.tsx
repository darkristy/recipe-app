import styled from "@emotion/styled";
import Link from "next/link";

interface SubLinkProps {
	href: string;
	linkedText: string;
	unlinkedText?: string;
}

const UIElementStyles = {
	SubLink: styled.div`
		p {
			font-weight: 500;
			font-size: 14px;
			span {
				a {
					color: ${(props): string => props.theme.tiertiary};
				}
			}
		}
	`,
};

const Sublink = ({ href, linkedText, unlinkedText }: SubLinkProps): JSX.Element => (
	<UIElementStyles.SubLink>
		<p>
			{unlinkedText}
			<span>
				<Link href={href}>
					<a>{linkedText}</a>
				</Link>
			</span>
		</p>
	</UIElementStyles.SubLink>
);

export { Sublink };
