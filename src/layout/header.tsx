import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StyledButton } from "@/components/buttons";
// import { Toast } from "../utils/message";
import { WagmiProvider, useAccount } from 'wagmi'

import { Account } from '../utils/account'
import { WalletOptions } from '../utils/wallet-options'


function ConnectWallet() {
	const { isConnected } = useAccount()
	if (isConnected) return <Account />
	return <WalletOptions />
  }

export const Header = () => {
	const navigate = useNavigate()
	const [amount, setAmount] = useState(0);
	const [loading, setLoading] = useState(false);
	const location = useLocation();
	const [isScrolled, setIsScrolled] = React.useState(false);
	const [isMenuOpend, setIsMenuOpend] = React.useState(false);
	const [isMobile, setIsMobile] = React.useState(false)


	const onScroll = () => {
		const sticky = 10
		if (window.pageYOffset > sticky) {
			setIsScrolled(true)
		} else {
			setIsScrolled(false)
		}
	}

	const [status, setStatus] = React.useState({
		currencyMenuOpened: false,
		languageMenuOpened: false,
		cartMenuOpened: false,
		accountMenuOpened: false,
		isDashboard: false,
		constructionHeaderDisplay: true,
		showCategory: false,
		searchKeyword: ''
	})

	const onResize = () => {
		// if (window.innerWidth <= 992) {
		// 	setIsMobile(true)
		// } else {
		// 	setIsMobile(false)
		// }
	}


	React.useEffect(() => {
		window.addEventListener('scroll', onScroll);
		window.addEventListener('resize', onResize);
		setIsScrolled(window.pageYOffset > 10)
		/* setIsMobile(window.innerWidth <= 992) */
		setIsMenuOpend(false)
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onResize);
		};
	}, []);

	React.useEffect(() => {
		if (location.pathname.indexOf('/account') === 0) {
			setStatus({ ...status, isDashboard: true, showCategory: false })
		} else if (location.pathname.indexOf('/services') === 0) {
			setStatus({ ...status, isDashboard: false, showCategory: true })
		} else {
			setStatus({ ...status, isDashboard: false, showCategory: false })
		}
	}, [location.pathname])

	return (
		<>
			<StyledHeader className={`transparent ${isScrolled ? `fixed ${location.pathname.indexOf('/services') === 0 ? 'shadow-none' : ''}` : ''}`}>
				<div className={`main ${status.isDashboard ? 'ml-1 mr-1' : 'container'}`}>
					<div>
						<Link to='/' className="d middle">
							<img src="./logo.png" alt="logo" style={{width: 45, height: 'auto'}} />
						</Link>
						<div className="toggle-btn">
							<div className={`toggle-line ${isMenuOpend ? 'active' : ''}`} onClick={() => { setIsMenuOpend(!isMenuOpend) }}>
								<span></span>
							</div>
						</div>
					</div>
					<div className={`${isMenuOpend ? '' : 'hide'}`}>
						<div>
							<Link to='/' className="d middle gap-sm" style={{marginRight: 50}}>
								<img src="./logo.png" alt="logo" style={{width: 35, height: 'auto'}} />
							</Link>
							{isMenuOpend && (
								<div className="d between pt-1" style={{ width: '100%' }}>
									<div className="close">
										<span onClick={() => setIsMenuOpend(false)}>✕</span>
									</div>
								</div>
							)}
						</div>
						<ul >
							<li onClick={() => setIsMenuOpend(false)}>
								<Link to={'/'}>Home</Link>
							</li>
							<li onClick={() => setIsMenuOpend(false)}>
								<Link to={'/staking'}>Staking</Link>
							</li>
							<li>
								<div>
								{!isMobile && (
								<div>
									<div className="category">
										<StyledDropdown>
											<div className={`d middle gap title ${status.accountMenuOpened ? 'active' : ''}`} onClick={() => setStatus({...status, accountMenuOpened: !status.accountMenuOpened})}>
												<Link to = "/"> 
													<div>About Us</div>
												</Link>
											</div>
											<div className="menu" style={{top: 52, minWidth: 150 }} onClick={() => setIsMenuOpend(false)}>
												<div className="item" onClick={() => {setStatus({...status, accountMenuOpened: false}); const element = document.getElementById("section-1"); element?.scrollIntoView();}}>Token sale details</div>
												<div className="item" onClick={() => {setStatus({...status, accountMenuOpened: false}); const element = document.getElementById("section-2"); element?.scrollIntoView();}}>Token Economics</div>
												<div className="item" onClick={() => {setStatus({...status, accountMenuOpened: false}); const element = document.getElementById("section-3"); element?.scrollIntoView();}}>Roadmap</div>
												<div className="item" onClick={() => {setStatus({...status, accountMenuOpened: false}); const element = document.getElementById("section-4"); element?.scrollIntoView();}}>FAQ Section</div>
											</div>
											<div className="layout" onClick={() => setStatus({...status, accountMenuOpened: false})}></div>
										</StyledDropdown>
									</div>
								</div>
							)}
								</div>
							</li>
							<li>
								<Link to="/white-2.pdf" target="_blank">White Paper</Link>
							</li>
							<li>
								<Link to=''>
									{/* <StyledButton className="back" onClick={() => open()}>Connet Wallet</StyledButton> */}
									<ConnectWallet />
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</StyledHeader>
		</>
	)
}

const StyledHeader = styled.div`
	font-size: 1em;
	z-index: 1005;
	color: var(--text);
	&.transparent {
		/* background: linear-gradient(112.62deg, rgba(255, 255, 255, .3) -10.65%, rgba(255, 255, 255, .12) 104.47%); */
		background-image-source: radial-gradient(121.49% 277.08% at 0% 0%, rgba(255, 255, 255, .44) 0%, rgba(255, 255, 255, .05) 100%);
		backdrop-filter: blur(20px);
		/* background-color: var(--white) !important; */
		background-color: transparent;
		position: sticky;
		top: 0;
		width: 100%;
	}
	&.fixed {
		transition: 0.2s ease-in;
		animation-duration: 0.5s;
		animation-name: slideInDown;
		background-image-source: radial-gradient(121.49% 277.08% at 0% 0%, rgba(255, 255, 255, .44) 0%, rgba(255, 255, 255, .05) 100%);
		backdrop-filter: blur(20px);
		background-color: var(--white) !important;
		&.shadow-none {
			box-shadow: none;
		}
	}
	
	.logo-letter {
		font-size: 1.5em;
		font-weight: 600;
		margin-left: 0.2em;
		color: var(--text) !important;
	}
	.main {
		height: 5em;
	}
	.main > :nth-child(1) {
		display: none;
		height: 100%;
	}
	.main > :nth-child(2) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
		> div {
			display: flex;
			align-items: center;
			gap: 1em;
			.top-part {
				display: none;
			}
		}
	}
	.account-menu {
		display: none;
	}
	.close {
		display: none;
	}
	ul {
		padding: 0;
		margin: 0;
		display: flex;
		flex-wrap: nowrap;
		li {
			padding: 20px 12px;
			white-space: nowrap;
			display: flex;
			justify-content: center;
			align-items: center;
			> a {
				display: flex;
				align-items: center;
				gap: 0.5em;
				> .icon {
					display: none;
				}
			}
		}
	}
	@media (max-width: 992px) {
		.main > :nth-child(1) {
			height: 55.5px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			z-index: 10000;
			.toggle-btn {
				transition: all 0.3s;
				border-radius: 50%;
				padding: 6px;
				&:hover {
					background-color: var(--hover-back);
				}
				cursor: pointer;
				.toggle-line {
					position: relative;
					width: 32px;
					height: 32px;
					display: block;
					span {
						content: "";
						position: absolute;
						background: var(--text);
						transition: all 0.2s;
						height: 2px;
						left: 4px;
						border-radius: 3px;
						top: 50%;
						margin-top: -1px;
						width: 20px;
					}
					&:before {
						content: "";
						position: absolute;
						background: var(--text);
						transition: all 0.2s;
						width: 24px;
						height: 2px;
						left: 4px;
						top: 8px;
						border-radius: 3px;
					}
					&:after {
						content: "";
						position: absolute;
						background: var(--text);
						transition: all 0.2s;
						width: 24px;
						height: 2px;
						left: 4px;
						border-radius: 3px;
						bottom: 8px;
					}
					&.active {
						&:before {
							transform: rotate(45deg);
    						top: 15px;
							width: 28px;
    						left: 2px;
						}
						span {
							opacity: 0;
    						visibility: hidden;
						}
						&:after {
							transform: rotate(-45deg);
    						bottom: 15px;
							width: 28px;
    						left: 2px;
						}
					}
				}
			}
		}
		.main > :nth-child(2) {
			width: 100%;
			height: 500px;
			z-index: 1001;
			position: fixed;
			color: var(--text);
			background-color: var(--light-back);
			padding: 1em;
			padding-top: 0;
			flex-direction: column;
			justify-content: flex-start;
			z-index: 1003;
			top: 0;
			left: 0;
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;
			transition-duration: .6s;
			transition-timing-function: ease;
			&.hide {
				left: -100vw
			}
			> div {
				flex-direction: column;
				width: 100%;
				> a {
					display: none;
				}
				.close {
					width: 100%;
					text-align: right;
					display: block;
					> span {
						width: 30px;
						height: 30px;
						float: right;
						background: transparent;
						text-align: center;
						line-height: 30px;
						cursor: pointer;
					}
				}
			}
			a {
				color: var(--text);
			}
		}
		ul {
			flex-direction: column;
			align-items: flex-start;
			width: 100%;
			padding-left: 1em;
			li {
				display: block;
				position: relative;
				padding: 1em 0;
				width: 100%;
				> a {
					> .icon {
						display: block;
					}
				}
			}
		}
		.back-layout {
			background-color: var(--white);
			width: 100%;
			height: 500px;
			top: 0;
			left: 0;
			position: fixed;
			z-index: 1002;
		}
	}
	
`

const StyledDropdown = styled.div`
	position: relative;
	.title {
		cursor: pointer;
		
		&.active {
			~ .menu {
				max-height: 500px;
			}
			~ .layout {
				display: block;
			}
		}
	}
	.menu {
		display: block;
		position: absolute;
		z-index: 99;
		background-color: var(--white);

		padding: 0;
		min-width: 160px;
		width: auto;
		top: 0;
		box-shadow: 0 1px 4px 0px rgba(0, 0, 0, 0.1);
		transition: all 0.6s ease-in-out;
		max-height: 0;
		overflow: hidden;
		padding: 0px 5px;
		font-size: 0.85em;
		.item {
			padding: 5px 10px;
			transition: all 0.3s;
			cursor: pointer;
			display: block;
			color: var(--text);
			&:hover {
				background-color: var(--background);
			}
		}
	}
	.layout {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: transparent;
		display: none;
		z-index: 98;
	}
`