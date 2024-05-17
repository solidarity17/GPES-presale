import React from 'react';
import { styled } from 'styled-components';

const Avatar = ({icon, username, email, size}: {icon?: string, username?: string, email?: string, size?: number}) => {
	const [name, setName] = React.useState("");
	React.useEffect(() => {
		if(username) {
			const n = username.split(" ");
			if(n.length > 1) {
				setName(n?.[0]?.slice(0, 1).toUpperCase() + n?.[1]?.slice(0, 1).toUpperCase())
			}
			else {
				setName(n?.[0]?.slice(0, 2).toUpperCase())
			}
		} else if(email) {
			const n = email.split(".");
			if(n.length > 1) {
				const m = n?.[0];
				setName(m.slice(0, 2).toUpperCase() )
			}
		}
	}, [username, email])

	return (
		<StyledAvatar size={size || 32}>
			{!!icon ? (
				<img src={icon || "/img/avater.jpg"} alt="avatar" width={32} height={32} loading='lazy'/>
			) : (
				<span>{name}</span>
			)}
			{/* <div className="primary"></div> */}
		</StyledAvatar>
	)
}

const StyledAvatar = styled.div<{size: number}>`
	position: relative;
	width: ${({size}) => size + 'px'};
	height: ${({size}) => size + 'px'};
	background-color: var(--light);
	border-radius: 50%;
	display: block;
	> img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		object-fit: cover;
		display: block;
		aspect-ratio: 1 / 1;
	}
	> span {
		display: flex;
		justify-content: center;
		align-items: center;
		text-transform: uppercase;
		font-weight: 900;
		font-size: ${({size}) => (size / 2) + 'px'};
		width: 100%;
		height: 100%;
		border-radius: 50%;
		color: var(--primary);
		border: 1px solid var(--primary);
	}
	> div {
		position: absolute;
		width: ${({size}) => size > 50 ? '20px' : '13px'};
		height: ${({size}) => size > 50 ? '20px' : '13px'};
		background: #252629;
		display: flex;
		border-radius: 50%;
		border: 2px solid #fff;
		position: absolute;
		right: -5px;
		top: ${({size}) => !!size ? (size > 50 ? size - 30 + 'px' : size - 13 + 'px') : '27px'};
		&.danger {
			background-color: #e23528;
		}
		&.primary {
			background-color: #28af51;
		}
		&.red {
			background-color: var(--orange);
		}
	}
`


export default Avatar