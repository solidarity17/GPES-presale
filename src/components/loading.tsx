import styled from "styled-components";


const Loading = ({show}: {show: boolean}) => {
	return (
		<StyledLoading className={`${show ? '' : 'hidden'}`}>
			<video autoPlay loop muted src="./loading.MP4" />
		</StyledLoading>
	)
}

export default Loading;

const StyledLoading = styled.div`
	z-index: 9999;
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	background-color: var(--back);
	transition: all 0.5s;
	opacity: 1;
	visibility: visible;
	video {
		width: 100%;
		height: 100%;
	}
	&.hidden {
		visibility: hidden;
		opacity: 0;
	}
`