// import React from 'react';
import { styled } from 'styled-components';

const Success = (/* { dark }: { dark?: boolean } */) => {
	return (
		<StyledSuccess dark className="animation-success" viewBox="0 0 52 52">
			<circle className="circle" cx="26" cy="26" r="25" fill="none" />
			<path className="check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
		</StyledSuccess>
	)
}

const StyledSuccess = styled.svg<{ dark: boolean }>`
	width: 100px;
	height: 100px;
	border-radius: 50%;
	display: block;
	stroke-width: 2;
	stroke: #4bb71b;
	stroke-miterlimit: 10;
	box-shadow: inset 0px 0px 0px #4bb71b;
	animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
	position:relative;
	top: 5px;
	right: 5px;
	margin: 0 auto;

	.circle {
		stroke-dasharray: 166;
		stroke-dashoffset: 166;
		stroke-width: 2;
		stroke-miterlimit: 10;
		stroke: #4bb71b;
		fill: ${props => props.dark ? "var(--back)" : "#fff"};
		animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
	}

	.check {
		transform-origin: 50% 50%;
		stroke-dasharray: 48;
		stroke-dashoffset: 48;
		animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
	}

	@keyframes stroke {
		100% {
			stroke-dashoffset: 0;
		}
	}

	@keyframes scale {
		0%, 100% {
			transform: none;
		}

		50% {
			transform: scale3d(1.1, 1.1, 1);
		}
	}

	@keyframes fill {
		100% {
			box-shadow: inset 0px 0px 0px 30px #4bb71b;
		}
	}
`

export default Success