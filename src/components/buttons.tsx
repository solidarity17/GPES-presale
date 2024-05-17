import styled from 'styled-components'

export const StyledButton = styled.button`
	padding: 1em 1.5em;
	border: 0;
	border-radius: 10px;
	font-size: 0.95em;
	cursor: pointer;
	transition: all 0.3s;
	width: auto;
	display: flex;
	align-items: center;
	gap: 5px;
	position: relative;
	overflow: hidden;
	color: var(--white);
	background-color: var(--primary-hover);
	&.outline {
		border: 1px solid var(--primary);
		color: var(--primary);
		background-color: transparent;
		&:hover {
			background-color: rgba(255, 255, 255, 0.1);
		}
	}
	&.back {
		background-color: var(--primary);
		color: white;
		&:hover {
			background-color: var(--primary-hover);
		}
		&:hover {
			background-color: var(--primary-hover);
		}
	}
	&.fill {
		width: 100%;
	}
	&:not(:disabled):after {
		background: linear-gradient(90deg, rgba(25,103,210,.2) 0px, rgba(25,103,210,.2) 77%, rgba(255, 255, 255, 0.1) 92%, rgba(255, 255, 255, 0));
		content: "";
		height: 200%;
		left: -210%;
		opacity: 0;
		position: absolute;
		top: -50%;
		transition: all 0.4s ease 0s;
		width: 200%;
	}
	&:not(:disabled):hover {
		&::after {
			left: -30%;
			opacity: 1;
			top: -20%;
			transition-duration: 0.7s, 0.7s, 0.15s;
			transition-property: left, top, opacity;
			transition-timing-function: linear;
		}
	}

`

export const StyledCircleButton = styled.button`
	background-color: transparent;
	color: var(--text);
	border: 0;
	border-radius: 50%;
	padding: 10px;
	cursor: pointer;
	&:hover {
		background-color: var(--hover-back);
	}
`

export const StyledSocialButton = styled.button`
	color: white;
    background-color: rgba(51, 221, 243, 0.514);
	border: 0;
	border-radius: 50%;
	padding: 7px;
	cursor: pointer;
	transition: all 0.3s;
	&:hover {
		background-color: var(--primary);
	}
`