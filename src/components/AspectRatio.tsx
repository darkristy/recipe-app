import styled from "@emotion/styled";

interface AspectRatioProps {
	ratio: any;
}

const AspectRatioStyles = {
	OuterWrapper: styled.div<{ ratio: AspectRatioProps["ratio"] }>`
		position: relative;
		padding-bottom: ${(props) => props.ratio * 100}%;
	`,
	InnerWrapper: styled.div`
		position: absolute;
		width: 100%;
		height: 100%;
	`,
};

const AspectRatio: React.FC<AspectRatioProps> = ({ children, ratio }) => (
	<AspectRatioStyles.OuterWrapper ratio={ratio}>
		<AspectRatioStyles.InnerWrapper>{children}</AspectRatioStyles.InnerWrapper>
	</AspectRatioStyles.OuterWrapper>
);

export default AspectRatio;
