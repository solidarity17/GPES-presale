import { styled } from "styled-components"
import Icon from "./icons"

export const StyledTabs = styled.div`
    display: flex;
    align-items: center;
    font-size: 1em;
    .tab {
        cursor: pointer;
        padding: 8px 16px;
        border-bottom: 2px solid transparent;
        position: relative;
        &::after {
            content: '';
            position: absolute;
            width: 0;
            top: 100%;
            left: 0;
            height: 2px;
            background-color: var(--border);
            transition: 0.3s;
        }
        &:hover:not(.active) {
            &::after {
                background-color: var(--primary-hover);
                width: 100%;
            }
        }
        &.active {
            color: var(--primary);
            border-bottom: 2px solid var(--primary);
        }
    }
`


export const StyledCard = styled.div`
	background-color: var(--menu-back);
	border-radius: 8px;
	padding: 1.5rem;
	@media (max-width: 768px) {
		padding: 1rem;
	}
	&.primary-border {
		border-color: var(--primary);
	}
	&.border {
		border: 1px solid var(--border);
	}
	&.shadow {
		box-shadow: 0px 4px 5px 1px rgba(0,0,0,.1), 0px 2px 7px 1px rgba(0,0,0,.08), 0px 3px 3px -2px rgba(0,0,0,.15);
	}
	&.cursor-pointer {
		cursor: pointer;
	}
	&.none-back {
		background-color: transparent;
	}
	&.hover {
		transition: all 0.3s;
		&:hover {
			background-color: var(--menu-back);
		}
	}
`

export const StyledCardList = styled.div`
    .item {
        padding: 0 24px;
        &:hover {
            background-color: var(--hover-back);
        }
        &.border-bottom {
            border-bottom: 1px solid var(--border);
        }
        &.border-top {
            border-top: 1px solid var(--border);
        }
        .content {
            color: var(--gray-text);
            font-size: 1em;
            padding: 15px 0 16px 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1em;
            cursor: pointer;
            @media (max-width: 768px) {
                padding: 10px 0 10px 0;
            }
            .icon {
                flex-shrink: 0;
                display: flex;
                align-items: center;
                justify-content: center
            }
            .desc {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1em;
                line-break: anywhere;
                > :nth-child(1) {
                    /* font-size: 0.95em; */
                }
                > :nth-child(2) {
                    flex: 1;
                }
                @media (max-width: 768px) {
                    display: block;
                    > :nth-child(1) {
                        width: auto !important;
                    }
                }
            }
            .detail {
                display: flex;
                align-items: center;
                gap: 0.5em;
				color: var(--primary);
            }
        }
    }
`

export const StyledExpand = styled.div`
    max-height: 0;
    overflow-y: hidden;
    transition: max-height 0.7s ease-in-out;
    &.expand {
        max-height: 1000px;
    }
`

export const Others = {
	Badge: ({ text, type }: { text: string, type: 'primary' | 'warning' | 'danger' | 'primary' | 'purple' | 'light-primary' | 'light-warning' | 'light-danger' }) => {
		return (
			<StyledBadge className={type}>{text}</StyledBadge>
		)
	},
	Stars: ({ value, valueDisplay, size }: { value: number, valueDisplay?: boolean, size: number }) => {
		return (
			<div className="d middle" style={{ gap: '0.3em' }}>

				{Array(Math.floor(value)).fill(0).map((_i, k) => (
					<div key={k} style={{ color: 'var(--orange)' }}>
						<Icon icon="Star" size={size} />
					</div>
				))}
				{Array(5 - Math.floor(value)).fill(0).map((_i, k) => (
					<div key={k} style={{ color: '#bac1cc' }}>
						<Icon icon="Star" size={size} />
					</div>
				))}
				{value !== 0 && !!valueDisplay && <div style={{ color: `${value > 4.5 ? 'var(--secondary)' : (value > 2 ? 'var(--orange)' : 'var(--danger)')}`, fontWeight: '900', lineHeight: 1.6 }}>{value}</div>}
			</div>
		)
	}
}

export const StyledNoticeDropDown = styled.div`
	position: absolute;
	top: 56px;
	right: 0;
	left: auto;
	width: 400px;
	box-shadow: 0 0 20px 0 var(--shadow);
	transition: all 0.3s ease;
	opacity: 0;
	visibility: hidden;
	overflow: hidden;
	z-index: 999999;
	color: var(--text);
	@media (max-width: 992px) {
		display: none;
	}
	&:hover {
		opacity: 1;
		visibility: visible;
	}
	> div {
		background-color: var(--menu-back);
		padding: 0;
		border-radius: 6px;
		padding: 1em;
		> :nth-child(1) {
			display: flex;
			align-items: center;
			gap: 1em;
			background-color: var(--hover-back);
			border-radius: 6px;
			padding: 1em;
			font-size: 0.85em;
			> :nth-child(2) {
				flex: 1;
				color: var(--orange);
				font-weight: 600;
				cursor: pointer;
			}
			> :nth-child(3) {
				font-weight: 600;
			}
		}
		> :nth-child(2) {
			width: 100%;
			margin-top: 1em;
			height: 300px;
			overflow-y: auto;
			overflow-x: hidden;
			> div {
				padding: 1em;
				cursor: pointer;
				position: relative;
				.avatar {
					width: 40px;
					height: 40px;
					border-radius: 50%;
				}
				.title {
					font-weight: 600;
					font-size: 1em;
					max-width: 280px;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
				.content {
					font-size: 0.9em;
					line-break: anywhere;
					max-width: 280px;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
				.time {
					position: absolute;
					top: 30px;
					right: 15px;
					font-size: 0.8em;
				}
				&:hover {
					background-color: var(--hover-back);
					border-radius: 6px;
				}
			}
		}
	}
`

const StyledBadge = styled.div`
	color: #eee !important;
	border-radius: 0.3rem;
	font-size: 0.85em;
	padding: 0em 0.7em;
	font-weight: 550;
	&.primary {
		background-color: var(--primary);
	}
	&.warning {
		background-color: var(--orange);
	}
	&.danger {
		background-color: var(--danger);
	}
	&.secondary {
		background-color: var(--secondary);
	}
	&.purple {
		background-color: var(--purple);
	}
	&.light-primary {
		background: rgba(139, 195, 74,0.1);
		color: #8bc34a !important;
	}
	&.light-warning {
		background: rgba(255, 152, 0,0.1);
		color: #ff9800 !important;
	}
	&.light-danger {
		background: rgba(220, 44, 44,0.1);
		color: #dc2c2c !important;
	}
`

export const StyledSteps = styled.ul`
	padding: 0;
	border-left: 1px dashed var(--dark-primary);
	&.check {
		> li:before {
			content: "✓";
		}
	}
	&.arrow {
		> li:before {
			content: "";
		}
	}
	> li {
		list-style: none;
		position: relative;
		padding-left: 30px;
		margin-bottom:  16px;
		&:before {
			position: absolute;
			left: -15px;
			top: 0;
			width: 24px;
			height: 24px;
			font-size: 16px;
			border-radius: 50%;
			background: var(--primary);
			color: #fff;
			box-shadow: 0px 0px 0px 5px var(--light-primary);
			-webkit-box-shadow: 0px 0px 0px 5px var(--light-primary);
			display: flex;
			justify-content: center;
			align-items: center;
		}
		&:after {
			position: absolute;
			content: '';
			left: 0;
			top: 12px;
			height: 1px;
			width: 30px;
			border-bottom: 1px dashed var(--dark-primary);
		}
		> div {
			background: var(--menu-back);
			padding: 1.5em;
			border-radius: 4px;
		}
	}
`

export const StyledAttachment = styled.div`
	display: flex;
	align-items: center;
	background: var(--menu-back);
	margin: 0.5rem 0;
	padding: 1rem 1rem;
	border-radius: 6px;
	> :nth-child(1) {
		display: flex;
		flex: 1;
		align-items: center;
		gap: 1em;
		> img {
			width: 55px;
			height: auto;
		}
		> :nth-child(2) {
			display: flex;
			flex-direction: column;
			gap: 0.5em;
			> :nth-child(1) {
				font-weight: 600;
			}
			> :nth-child(2) {
				color: var(--gray-text);
			}
		}
	}
	> :nth-child(2) {
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--light-back);
		border-radius: 4px;
		color: var(--text);
		cursor: pointer;
	}
`

export const StyledWorkBid = styled.div`
	display: flex;
	position: relative;
	padding: 1rem 0;
	border-bottom: 1px dashed var(--border);
	@media (max-width: 1024px) {
		display: block;
	}
	> :nth-child(1) {
		display: flex;
		/* align-items: center; */
		gap: 1em;
		flex: 1;
		@media (max-width: 1024px) {
			display: block;
		}
		> img {
			width: 64px;
			border-radius: 50%;
		}
		> div {
			display: flex;
			flex-direction: column;
			> :nth-child(1) {
				font-size: 1.2em;
				font-weight: 700;
			}
			> :nth-child(2) {
				color: var(--gray-text);
				display: flex;
				gap: 0.3em;
				align-items: center;
			}
			> :nth-child(3) {
				color: var(--gray-text);
				display: flex;
				align-items: center;
				gap: 0.3em;
				flex-wrap: wrap;
			}
		}
	}
	> :nth-child(2) {
		text-align: right;
		> :nth-child(1) {
			color: var(--primary);
			font-size: 1.4em;
			font-weight: 750;
		}
		> :nth-child(2) {
			color: var(--gray-text);
			margin-bottom: 8px;
		}
	}
	.msg-btn {
		font-size: 1rem;
		color: var(--primary);
		border: 1px solid var(--primary);
		border-radius: 4px;
		padding: 4px 8px;
		cursor: pointer;
	}
	.award-btn {
		font-size: 1rem;
		color: var(--secondary);
		border: 1px solid var(--secondary);
		border-radius: 4px;
		padding: 4px 8px;
		cursor: pointer;
	}
	.accept-btn {
		font-size: 1rem;
		color: var(--danger);
		border: 1px solid var(--danger);
		border-radius: 4px;
		padding: 4px 8px;
		cursor: pointer;
	}
`

export const StyledBlogList = styled.div`
	background: var(--light-back);
	border-radius: 10px;
	box-shadow: 0px 0px 10px 0px var(--shadow);
	-webkit-box-shadow: 0px 0px 10px 0px var(--shadow);
	cursor: pointer;
	margin: 1em 0;
	color: var(--text);
	transition: 0.2s;
	overflow: hidden;
	padding-bottom: 8px;
	height: 95%;
	&:hover {
		transform: translateY(-2px);
	}
	.popular {
		position: absolute;
		top: 0;
		right: 0;
	}
	.tag {
		background-color: var(--light-primary);
		padding: 4px;
		margin: 0;
		border-radius: 4px;
	}
	> img {
		width: 100%;
		border-radius: 6px 6px 0 0;
		transition: 0.2s;
		aspect-ratio: 1 / 0.56;
		object-fit: cover;
	}
	> div {
		display: flex;
		flex-direction: column;
		gap: 0.3em;
		padding: 12px 24px;
		line-height: 1.5;
		> :nth-child(1) {
			font-size: 14px;
		}
		> :nth-child(2) {
			color: var(--gray-text);
			/* font-weight: 700; */
		}
		> :nth-child(3) {
			color: var(--gray-text);
			font-size: 14px;
		}
		> :nth-child(4) {
			margin-top: 4px;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			gap: 1em;
			> div {
				padding: 6px 10px;
				border-radius: 6px;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				font-weight: 600;
				font-size: 0.9em;
				cursor: pointer;
				&.primary {
					background: rgba(9, 178, 228,0.1);
					color: #09b2e4;
				}
				&.primary {
					background: rgba(121, 187, 44,0.1);
					color: #79bb2c;
				}
				&.purple {
					background: rgba(144, 87, 208,0.1);
					color: #9057d0;
				}
				&.danger {
					background: rgba(255, 87, 34,0.1);
					color: #ff5722;
				}
			}
		}
	}
`
export const StyledBlockquote = styled.blockquote`
	background: var(--light-back);
	padding: 28px;
	margin: 50px 0;
	border-radius: 4px;
	border-left: 3px solid #0b85ec;
	display: flex;
	align-items: center;
	flex-wrap: no-wrap;
	gap: 1.5em;
	> :nth-child(1) {
		color: #f96825;
		min-width: 32px;
	}
	> :nth-child(2) {
		font-style: italic;
		> :nth-child(1) {
			margin: 25px 0 0;
			line-height: 2;
		}
		> :nth-child(2) {
			color: var(--text);
			font-size: 1.2em;
			font-weight: 700;
			margin-top: 0.5em;
		}
	}
`

export const StyledSkillTag = styled.div`
	/* height: 25px; */
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 4px 8px;
	border-radius: 3px;
	font-size: 0.85em;
	font-weight: 400;
	cursor: pointer;
	transition: all ease 0.4s;
	&.gray {
		background: var(--gray);
		color: var(--text);
	}
	&.orange {
		background-color: var(--orange);
		color: var(--light);
	}
	&.primary {
		background-color: var(--light-primary);
		color: var(--text);
		&:hover {
			background-color: var(--dark-primary);
		}
	}
`

export const StyledRow = styled.div`
	/* display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between; */
	display: grid;
	grid-template-columns: auto auto auto auto auto;
	justify-content: flex-start;
	gap: 1em;
	/* > div {
		width: 18%;
	} */
	@media (max-width: 1360px) {
		/* > div {
			width: 18%;
		} */
		grid-template-columns: auto auto auto auto;
	}
	@media (max-width: 1024px) {
		grid-template-columns: auto auto auto;
		/* > div {
			width: 30%;
		}
		justify-content: center; */
	}
	@media (max-width: 768px) {
		grid-template-columns: auto auto;
		/* > div {
			width: 48%;
		}
		justify-content: center; */
		justify-content: center;
	}
	@media (max-width: 576px) {
		grid-template-columns: auto;
		/* > div {
			width: 100%;
		}
		justify-content: center; */
		justify-content: center;
	}
`

export const StyledTopRated = styled.div`
	background-color: var(--warning);
	color: #102A51;
	font-weight: 700;
	border-radius: 5px;
	border: 0;
	padding: 0em 0.5em;
	white-space: nowrap;
`

export const StyledBorderCard = styled.div`
	border: 1px solid var(--border);
	border-radius: 4px;
	padding: 1.5rem;
	@media (max-width: 768px) {
		padding: 1rem;
	}
	&.primary-border {
		border-color: var(--primary);
	}
	&.cursor-pointer {
		cursor: pointer;
	}
`

export const StyledDefaultCard = styled.div`
	box-shadow: 0 0 20px 0 var(--shadow);
	border-radius: 3px;
	.padding {
		padding: 1.5rem;
		@media (max-width: 768px) {
			padding: 1rem;
		}
	}
	.border {
		border-bottom: 1px solid var(--border);
		padding-bottom: 1rem;
	}
`

export const StyledFaqComponent = styled.div`
	> label {
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		gap: 1em;
		align-items: center;
		font-size: 1.1em;
		font-weight: 500;
		position: relative;
		padding: 0.5em 0;
		padding-right: 1rem;
		>.arrow {
			position: absolute;
			top: 10px;
			left: auto;
			right: 10px;
			height: 8px;
			width: 8px;
			display: block;
			border-style: solid;
			border-width: 0 1px 1px 0;
			border-color: transparent var(--gray-text) var(--gray-text) transparent;
			-ms-transform: rotate(45deg);
			transform: rotate(45deg);
			transition: all 0.3s;
		}
	}
	> input {
		display: none;
		&:checked {
			~.content {
				height: auto;
				padding: 0.5em 0;
			}
			~label {
				>.arrow {
					transform: rotate(-135deg);
				}
			}
		}
	}
	> .content {
		height: 0;
		overflow: hidden;
		transition: all 0.3s;
		color: var(--gray-text);
	}
	padding: 0.5em 0;
	border-bottom: 1px solid var(--border);
`


export const StyledSelectType = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1em;
	background-color: var(--light);
	border: 2px solid var(--border);
	border-radius: 4px;
	cursor: pointer;
	height: 100%;
	padding: 24px 24px;
	transition: 0.2s;
	position: relative;
	&:hover {
		border: 2px solid var(--primary);
		/* transform: translateY(-5px); */
	}
	> img {
		height: 200px;
		width: auto;
		max-width: 100%;
		@media (max-width: 768px) {
			max-width: 300px;
			width: 100%;
			height: auto;
		}
	}
	> div {
		font-size: 1.3em;
		font-weight: 700;
	}
	@media (max-width: 768px) {
		div {
			font-size: 1rem;
		}
	}
	&.active {
		border: 2px solid var(--primary);
	}
`

export const StyledReactTagInput = styled.div`
	.ReactTags__selected {
		> .tag-wrapper {
			display: inline-flex;
			align-items: center;
			gap: 0.3em;
			/* height: 32px; */
			font-weight: 500;
			color: var(--text);
			line-height: 32px;
			padding: 0 12px;
			border-radius: 16px;
			background-color: var(--hover-back);
			margin-bottom: 5px;
			margin-right: 5px;
			border: 1px solid var(--hover-back);
			> .ReactTags__remove {
				background-color: transparent;
				color: var(--text);
				border: 0;
				font-size: 1.2em;
				padding: 0;
				margin-top: 2px;
				cursor: pointer;
			}
		}
	}
	.ReactTags__tagInput {
		> .ReactTags__tagInputField {
			width: 100%;
			border: 1px solid var(--border);
			border-radius: 4px;
			background: transparent;
			height: 50px;
			font-size: 1.1em;
			padding: 0.5rem 0.75rem;
			color: var(--text);
			outline: 0;
			margin: 0 0 8px 0;
			&:focus {
				border-color: var(--primary);
			}
		}
	}
	.ReactTags__tags {
		position: relative;
	}
	.ReactTags__suggestions ul {
		list-style-type: none;
		box-shadow: 0.05em 0.01em 0.5em var(--shadow);
		background: var(--light-back);
		max-height: 500px;
		overflow-y: auto;
		padding: 0;
		position: absolute;
		left: 0;
		right: 0;
		z-index: 100;
	}
	.ReactTags__suggestions li {
		border-bottom: 1px solid var(--border);
		padding: 0.5em 1em;
		margin: 0;
		font-weight: 400;
	}
	.ReactTags__suggestions li mark {
		color: var(--text);
		background: none;
		font-weight: 600;
	}
	.ReactTags__suggestions ul li.ReactTags__activeSuggestion {
		background: var(--hover-back);
		cursor: pointer;
	}
`

export const StyledBackImage = styled.img`
	width: 100%;
	height: auto;
	max-width: 500px;
	max-height: 300px;
	@media (max-width: 992px) {
		display: none;
	}
`
export const StyledAvatarUpload = styled.div`
	width: 300px;
	display: flex;
	align-items: center;
	> input {
		position: relative;
		z-index: 2;
		width: 100%;
		display: none;
	}
	> label {
		width: 300px;
		height: 300px;
		border-radius: 10px;
		background: var(--light-back);
		border: 1px dashed var(--text);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
`

export const StyledColorRoundDiv = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	opacity: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--light) !important;
	background: var(--primary);
	&.primary {
		background-color: #1baf65;
	}
	&.warning {
		background-color: #f39f00;
	}
	&.dark {
		background-color: #002758;
	}
	&.danger {
		background-color: #ce024b;
	}
	&.gray {
		background-color: rgba(41, 68, 193,0.1);
		color: var(--blue) !important;
	}
`

export const StyledNotificationList = styled.div`
	padding: 1.5em 1em;
	display: flex;
	align-items: center;
	gap: 1em;
	justify-content: space-between;
	flex-wrap: wrap;
	border-bottom: 1px solid var(--border);
	background-color: transparent;
	&.top-border {
		border-top: 1px solid var(--border);
	}
	> :nth-child(1) {
		> :nth-child(1) {
			display: flex;
			gap: 0.5em;
			align-items: center;
			> :nth-child(2) {
				font-weight: 600;
				color: var(--text);
				font-size: 1.2em;
			}
		}
	}
`

export const StyledBidderList = styled.div`
	position: relative;
	border: 1px solid var(--border);
	border-radius: 6px;
	padding-top: 1.5em;
	> .hourly-rate {
		position: absolute;
		top: 12px;
		left: 15px;
	}
	> .delete {
		width: 38px;
		height: 38px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--hover-back);
		border-radius: 50%;
		color: #5c75a2;
		transition: all ease 0.4s;
		position: absolute;
		top: 15px;
		right: 15px;
		cursor: pointer;
		&:hover {
			color: var(--light);
			background: #d63232;
		}
	}
	> .content {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 1rem 2rem;;
		> .avatar {
			position: relative;
			> img {
				width: 80px;
				height: 80px;
				border-radius: 50%;
			}
			> .verified {
				position: absolute;
				left: auto;
				right: -8px;
				top: 35px;
			}
		}
		> :nth-child(2) {
			color: var(--gray-text);
			display: flex;
			align-items: center;
			gap: 0.5em;
			font-weight: 600;
		}
		> :nth-child(3) {
			font-size: 1.2em;
			font-weight: 600;
		}
		> .conditions {
			display: flex;
			align-items: center;
			gap: 1em;
			justify-content: space-between;
			margin-top: 0.5em;
			> div {
				width: calc(50% - 1em);
				white-space: nowrap;
				text-align: left;
				display: flex;
				flex-direction: column;
				align-items: center;
				> :nth-child(1) {
					font-size: 1.2em;
					font-weight: 800;
				}
				> :nth-child(2) {
					color: var(--gray-text);
					font-weight: 600;
					margin-top: -5px;
				}
			}
		}
		> .actions {
			margin-top: 0.5em;
			display: flex;
			align-items: center;
			gap: 1em;
			justify-content: center;
			width: 100%;
			> div {
				/* width: calc(50% - 1em); */
				white-space: nowrap;
				text-align: left;
				button {
					font-size: 0.9em;
					font-weight: 700;
					padding: 0.8em;
					gap: 0.1em;
				}
			}
		}
	}
	> .bottom {
		border-top: 1px solid var(--border);
		padding: 0.5em;
		display: flex;
		align-items: center;
		gap: 1em;
		justify-content: space-between;
		flex-wrap: wrap;
		width: 100%;
		> :nth-child(2) {
			width: 35px;
			height: 35px;
			align-items: center;
			justify-content: center;
			display: inline-flex;
			background: rgba(76, 175, 80,0.1);
			border-radius: 50%;
			color: #4caf50;
			cursor: pointer;
		}
	}
`

export const StyledAccountTab = styled.div`
	border-bottom: 1px solid var(--gray);
	position: relative;
	> div {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5em;
		cursor: pointer;
		border: 0;
		background-color: transparent;
		padding: 12px 1em;
		font-weight: 500;
		color: var(--gray-text);
		position: relative;
		min-width: 70px;
		&:hover {
			background-color: var(--light);
			color: var(--primary-hover);
		}
		&.active {
			color: var(--warning);
			background-color: var(--light);
			&::after {
				content: "";
    			position: absolute;
				width: 12px;
				height: 12px;
				border-color: var(--gray);
				border-style: solid;
				border-width: 1px 0 0 1px;
				-webkit-transform: rotate(45deg);
				transform: rotate(45deg);
				left: calc(50% - 6px);
				bottom: -7px;
				background-color: var(--back);
			}
		}
	}
`

export const StyledImgUpload = styled.label`
	background-color: var(--hover-back);
	border-radius: 4px;
	border: 1px dashed var(--text);
	color: var(--text);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 0.5em;
	padding: 1em;
	cursor: pointer;
	aspect-ratio: 1.7/1;
`

export const StyledListitem = styled.div`
	&.error {
		border: 1px solid var(--danger);
	}
	&.warn {
		border: 1px solid var(--warning);
	}
`

export const StyledListitemTip = styled.ul`
	padding-left: 1em;
	padding-top: 0.5em;
	padding-bottom: 1em;
	li {
		display: flex;
		align-items: center;
		gap: 0.5em;
	}
`