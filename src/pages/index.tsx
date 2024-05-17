import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { loadSlim } from "tsparticles-slim";
import Icon from "@/components/icons";
import { StyledButton, StyledSocialButton } from "@/components/buttons";
import Layout from "@/layout";
import Carousel from 'react-multi-carousel';
import config from '@/context/config.json';
import "react-multi-carousel/lib/styles.css";
import { StyledCard, StyledCardList, StyledExpand } from "@/components/others";
import Typewriter from "typewriter-effect";
import { Time } from "highcharts";
import { OutInput } from "@/components/inputs";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName, useBalance, useWaitForTransactionReceipt,useWriteContract } from 'wagmi'
import { bscTestnet, bsc } from 'wagmi/chains';
import { readContract, writeContract } from '@wagmi/core'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { wagmiConfig, PresaleContract } from "@/utils/config";
import abi from "@/utils/abi.json";
import { fromBigNum, toBigNum } from "../utils/crypto"
const faqs = [
	{ question: 'What is ICO Crypto?', answer: 'Once ICO period is launched, You can purchased Token with Etherum, Bitcoin or Litecoin. You can also tempor incididunt ut labore et dolore magna aliqua sed do eiusmod eaque ipsa.' },
	{ question: 'What cryptocurrencies can I use to purchase?', answer: 'Once ICO period is launched, You can purchased Token with Etherum, Bitcoin or Litecoin. You can also tempor incididunt ut labore et dolore magna aliqua sed do eiusmod eaque ipsa.' },
	{ question: 'What cryptocurrencies can I use to purchase?', answer: 'Once ICO period is launched, You can purchased Token with Etherum, Bitcoin or Litecoin. You can also tempor incididunt ut labore et dolore magna aliqua sed do eiusmod eaque ipsa.' },
	{ question: 'What cryptocurrencies can I use to purchase?', answer: 'Once ICO period is launched, You can purchased Token with Etherum, Bitcoin or Litecoin. You can also tempor incididunt ut labore et dolore magna aliqua sed do eiusmod eaque ipsa.' },
	{ question: 'How can I participate in the ICO Token sale?', answer: 'Once ICO period is launched, You can purchased Token with Etherum, Bitcoin or Litecoin. You can also tempor incididunt ut labore et dolore magna aliqua sed do eiusmod eaque ipsa.' },
];


const Home = () => {
	const { address } = useAccount()
	const { disconnect } = useDisconnect()
	const { data: ensName } = useEnsName({ address })
	const { data: ensAvatar } = useEnsAvatar({ name: ensName! })
	const { data, isError, isLoading } = useBalance({
		address: address,
		chainId: bscTestnet.id,  // Specify the chain ID for BNB Smart Chain
	});

	const {
		data: hash,
		isPending,
		writeContract
	} = useWriteContract() 
	console.log("Balance: ", data?.decimals ,data?.value, data?.symbol);

	const [time, setTime] = React.useState(+new Date())
	const [state, setStates] = React.useState({
		showMenu: false,
		coin: 'usdt_trc20',
		payment: 'cny_bank',
		sell: 0,
		buy: 0,
		info: {} as { [payment: string]: { [field: string]: string } },
		contractAddress: '0xE5bA47fD94CB645ba4119222e34fB33F59C7CD90',
		mobile: false,
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
		headerFixed: 0
	})

	const getRemainTime = () => {
		let countDownDate = new Date("2024-07-15 15:37:25").getTime();
		let now = new Date().getTime();
		let distance = countDownDate - now;
		let days = Math.floor(distance / (1000 * 60 * 60 * 24));
		let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((distance % (1000 * 60)) / 1000);
		updateStatus({ days, hours, minutes, seconds })
	}
	const updateStatus = (params: { [key: string]: string | number | boolean | any }) => setStates({ ...state, ...params })


	React.useEffect(() => {
		getRemainTime()
		const timer = setTimeout(() => setTime(+new Date()), 1000)
		return () => clearTimeout(timer)
	}, [time])

	const [status, setStatus] = React.useState({
		expand: -1
	})

	const MIN_TRADE = 500;
	const MAX_TRADE = 50000
	const margin = 3;
	const [rate, setRate] = useState(570);
	const refSell = React.useRef<HTMLInputElement>(null);
	// const getRate = async () => {
	// 	try {
	// 		const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
	// 		const data = await response.json();
	// 		const _rate = data.rates.CNY;
	// 		if (_rate) {
	// 			setRate(Math.round((_rate - _rate * margin / 100) * 100) / 100);
	// 		}
	// 	} catch (error) {
	// 		console.error('Error fetching exchange rate:', error);
	// 	}
	// };
	React.useEffect(() => {
		// if (rate === 0) {
		// 	getRate()
		// } else {
		// }
		const buy = Number((Number(state.sell) * rate).toFixed(2));
		setStates({ ...state, buy });
	}, [state.sell, rate])

	const buyToken = async () => {
		if (!address) {
			NotificationManager.warning('Please Connect Wallet');
			return;
		}
		if (state.sell <= 0) {
			NotificationManager.warning('Please Input BNB Amount');
			return;
		}

		// const result = await readContract(wagmiConfig, {
		// 	abi,
		// 	address: '0x17bCBDF29991358c3aBBB38A86f64fe116e56Dd3',
		// 	functionName: 'saleActive',
		// })
		// console.log(result)

		const init = toBigNum(String(state.sell), 18);
		console.log('init', init)
		// const buyResult = await writeContract(wagmiConfig, {
		// 	abi,
		// 	address: PresaleContract,
		// 	functionName: 'buy',
		// 	value: init,
		// })

		writeContract({
			address: PresaleContract,
			abi,
			functionName: 'buy',
			value: init,
		})

		// NotificationManager.error('Error message', 'Click me!', 5000, () => {
		//     alert('callback');
		//   });
	}
	return (
		<Layout meta={
			{
				title: "Home",
				desc: "Home page",
				image: {
					src: "",
					width: 0,
					height: 0
				}
			}
		}>
			<StyledParticle>
				<div className="top">
					{[...Array(1000)].map((x, i) =>
						<div className="circle-container">
							<div className="circle"></div>
						</div>
					)}
					<StyledHomeSection>
						<div className="container content" style={{ maxWidth: 1200 }}>
							<div className="row title d middle">
								<div className="col-lg-6 d column center md-middle md-order-2">
									<div className="main text-center">
										<h4 style={{ color: "var(--secondary)" }}>$ Green Energy Token</h4>
										<p>You can now claim your $Green Energy tokens.</p>
										<p>Plus, stake your tokens to earn rewards! Add</p>
										<p>Green Energy Token Address</p>
										<p>0xE2a628452bF028668f11EbdC3685372a5f71582D</p>
										<p>Your purchased Green Energy token = </p>
										<p>Your stakeable Green Energy token = </p>
										<div className="row gap" style={{ padding: "0px 1em" }}>
											<div className="col-lg-6 col-sm-12 ">
												<div className="d between">
													<p style={{ fontSize: "0.9em", fontWeight: "600" }}>Enter ETH amount</p>
													<p style={{ fontSize: "0.9em", fontWeight: "600" }}>Sell</p>
												</div>
												<div className="info d middle">
													<OutInput ref={refSell} type='number' placeholder='0.00' min={MIN_TRADE} max={MAX_TRADE} value={state.sell} onChange={e => setStates({ ...state, sell: Number(e.target.value) })} />
													<img src="/img/eth.png" alt="" width={30} height={30} />
												</div>
											</div>
											<div className="col-lg-6 col-sm-12">
												<div className="d between">
													<p style={{ fontSize: "0.9em", fontWeight: "600" }}>$ GN you receive</p>
												</div>
												<div className="info d middle">
													<OutInput type='number' placeholder='从: 10000' min={10} max={1e6} value={state.buy} />
													<img src="/logo.png" alt="" width={30} height={30} />
												</div>
											</div>
										</div>
										<div className="d center gap mt-2">
											<StyledButton onClick={buyToken} >BUY Token</StyledButton>
											<StyledButton>Connet Wallet</StyledButton>
										</div>
									</div>
								</div>
								<div className="col-lg-6 col-sm-12 mt-3">
									<div className='h2' style={{ color: "var(--secondary)" }}>
										<Typewriter
											onInit={(typewriter) => {
												typewriter
													.typeString("Green Energy Power Station ")
													.pauseFor(5000)
													.deleteAll()
													.typeString("Welcomes You")
													.pauseFor(5000)
													.deleteAll()
													.start();
											}}
											options={{
												loop: true,
												delay: 10
											}}
										/>
									</div>
								</div>
							</div>
						</div>
						{/* <div className="background"></div> */}
					</StyledHomeSection>
				</div>
			</StyledParticle>
			<StyledEconomicsSection className="section-1" id="section-1" style={{ backgroundColor: "var(--light-back)" }}>
				<div className="container">
					<div className="center mt5 pt5">
						<h3 className='text-blue p3 text-center' style={{ fontWeight: 'bold', fontFamily: "cursive" }}>Presale is Live Until!</h3>
					</div>
					<div className="row d center mt3">
						<div>
							<p className='m0 text-center'>Days</p>
							<div className="timebar">
								<div >
									<div className="timecard">{parseInt((state.days / 10).toString())}</div>
								</div>
								<div >
									<div className="timecard">{state.days % 10}</div>
								</div>
							</div>
						</div>
						<div>
							<p className='m0 text-center'>&nbsp;</p>
							<div className="timebar">
								<div className="timecard" style={{ backgroundColor: 'transparent', color: 'green', boxShadow: 'none', width: '20px' }}>:</div>
							</div>
						</div>
						<div>
							<p className='m0 text-center'>Hours</p>
							<div className="timebar">
								<div >
									<div className="timecard">{parseInt((state.hours / 10).toString())}</div>
								</div>
								<div >
									<div className="timecard">{state.hours % 10}</div>
								</div>
							</div>
						</div>
						<div>
							<p className='m0 text-center'>&nbsp;</p>
							<div className="timebar">
								<div className="timecard" style={{ backgroundColor: 'transparent', color: 'green', boxShadow: 'none', width: '20px' }}>:</div>
							</div>
						</div>
						<div>
							<p className='m0 text-center'>Minutes</p>
							<div className="timebar">
								<div >
									<div className="timecard">{parseInt((state.minutes / 10).toString())}</div>
								</div>
								<div >
									<div className="timecard">{state.minutes % 10}</div>
								</div>
							</div>
						</div>
						<div>
							<p className='m0 text-center'>&nbsp;</p>
							<div className="timebar">
								<div className="timecard" style={{ backgroundColor: 'transparent', color: 'green', boxShadow: 'none', width: '20px' }}>:</div>
							</div>
						</div>
						<div>
							<p className='m0 text-center'>Seconds</p>
							<div className="timebar">
								<div >
									<div className="timecard">{parseInt((state.seconds / 10).toString())}</div>
								</div>
								<div >
									<div className="timecard">{state.seconds % 10}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</StyledEconomicsSection>
			<StyledAboutSection className="section-2" id="section-2">
				<div className="container" style={{ maxWidth: 1200 }}>
					<div className="mt-1 md-order-2" style={{ height: '100%' }}>
						<h2>Tokenomics</h2>
						<div className="mt-1">At Green Energy Power Station, we’re dedicated to revolutionizing the way you store and manage your data. In a DECENTRALIZED platform That combines cutting-edge AI technology with secure cloud storage, offering an innovative solution for individuals and businesses alike to Anonymously manage and store your data.</div>
					</div>
					<div className="row mt-4">
						<div className="col-lg-4 col-md-12" style={{ marginTop: "8em" }}>
							<p>* Presale (40%): Initial distribution to early investors and supporters.</p>
							<p className="mt-2">* Liquidity (20%): Ensures liquidity on exchanges and facilitates trading.</p>
							<p>* Research & Development (R&D) (5%): Supports ongoing innovation, technology enhancements, and ecosystem growth.</p>
						</div>
						<div className="col-lg-4 col-md-12 center">
							<div className="text-center">
								<p>* Treasury (10%) : Reserved for future development, partnerships, and strategic initiatives.</p>
							</div>
							<img src="/img/loadmap.png" alt="loadMap" width={100} height={100} style={{ width: "100%", height: "auto" }} />
							<div className="text-center">
								<p>* Marketing (5%): Used for promotional activities, awareness campaigns, and community engagement.</p>
							</div>
						</div>
						<div className="col-lg-4 col-md-12" style={{ marginTop: "8em" }}>
							<p >* Charity (5%): Allocated for social impact and community welfare projects.</p>
							<p className="mt-2">* Team (10%): Reserved for the project team, incentivizing their efforts.</p>
							<p>* Insurance (5%):Reserved for insuring the project against unforeseen risks, such as smart contract vulnerabilities or external threats.</p>
						</div>

					</div>
				</div>
			</StyledAboutSection>
			<StyledRoadMapSection className="section-3" id="section-3">
				<div className="container" style={{ maxWidth: 1200 }}>
					<StyledTitle title="">Our RoadMap</StyledTitle>
					<div className="roadmap mt-3">
						<div className="item right">
							<div className="content">
								<div className="time checked">Step 1</div>
								<ul className="mt-1" style={{ listStyle: 'disc' }}>
									<li>Testing and preparing for Dapp release</li>
									<li>Launch Native token</li>
									<li>Partnerships with influencers and strong market names to widen the exposure and bring on more users.</li>
								</ul>
							</div>
						</div>
						<div className="item left">
							<div className="content">
								<div className="time">Step 2</div>
								<ul className="mt-1" style={{ listStyle: 'disc' }}>
									<li>Implement the subscription system and open the doors for feedbacks</li>
									<li>Release beta versions of the platform with AI features enabled.</li>
									<li>Gather feedback specifically on AI functionality, user experience, and performance.</li>
								</ul>
							</div>
						</div>
						<div className="item right">
							<div className="content">
								<div className="time">Step 3</div>
								<ul className="mt-1" style={{ listStyle: 'disc' }}>
									<li>Officially launch the updated platform with integrated AI features to the public.</li>
									<li>Get listed on major CEX. </li>
									<li>Market AI capabilities as a key value proposition to attract users.</li>
									<li>Collect user feedback on AI features post-launch.</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</StyledRoadMapSection>
			<StyledPartnerSection>
				<div className="container" style={{ maxWidth: 1200 }}>
					<StyledTitle title="">Our Partner</StyledTitle>
					<div className="d center middle gap wrap partner-list mt-2">
						<img src="./img/partners/a-md.png" alt="a-md" />
						<img src="./img/partners/a-sm.png" alt="a-sm" />
						<img src="./img/partners/a-xs.png" alt="a-xs" />
						<img src="./img/partners/b-md.png" alt="b-md" />
						<img src="./img/partners/b-sm.png" alt="b-sm" />
						<img src="./img/partners/b-xs.png" alt="b-xs" />
						<img src="./img/partners/c-md.png" alt="c-md" />
						<img src="./img/partners/c-sm.png" alt="c-sm" />
					</div>
				</div>
			</StyledPartnerSection>
			<StyledPricingSection className="container">
				<div>
					<h2 className='text-center p0 m0'>How it works?</h2>
					<div className="row center ml-auto mr-auto">
						<p className='text-center p3' >Evoki is the native token which interest rebase rewards are paid. Every token holder automatically receives 282% interest and reflection rewardsforayear, just for holding $Evoki tokens in their own wallet!
							The more you hold, the more you receive!</p>
					</div>
				</div>
				<div className="row d center middle mt5 middle">
					<div className="col-lg-6 col-md-12 ">
						<div>
							<div className="card">
								<div className="img-panel">
									<img src="/img/card1.png" alt="card1" />
									<div className="circle1"></div>
									<div className="circle2"></div>
									<div className="circle3"></div>
								</div>
								<div>
									<h5 className='text-blue m0'>Auto-Compounding</h5>
									<p className='m0 mt1'>Crypto’s Highest Paying Auto-Staking and Auto-Compounding Protocol with the greatest fixed APY in the industry of 282%. Interest rewards are compounded every 10 minutes automatically to every BSCwallet that is holding any Evoki tokens.</p>
								</div>
							</div>
						</div>
						<div>
							<div className="card">
								<div className="img-panel">
									<img src="/img/card2.png" alt="card1" />
									<div className="circle1"></div>
									<div className="circle2"></div>
									<div className="circle3"></div>
								</div>
								<div>
									<h5 className='text-blue m0'>Evoki Protocol Dividend Fund(EPDF)</h5>
									<p className='m0 mt1'>The EPDF serves as a Evoki dividends to achieve profitability, stability andlongtermsustainability of the Evoki Protocol, and not by just maintaining a consistent 282% rebase rate, but by paying Evoki dividends to all token holders. Evoki Protocol Growth Funds Vault.</p>
								</div>
							</div>
						</div>

						<div>
							<div className="card">
								<div className="img-panel">
									<img src="/img/card3.png" alt="card1" />
									<div className="circle1"></div>
									<div className="circle2"></div>
									<div className="circle3"></div>
								</div>
								<div>
									<h5 className='text-blue m0'>Growth Funds</h5>
									<p className='m0 mt1'>The Growth Funds provides support to the EPDF in the event of an extreme price drop for the Evoki token.
										The Growth Funds will also be utilized for Buy Back to support the value of Evoki token and used to develop Ecosystem projects.</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-6 col-md-12">
						<div>
							<div className="card" >
								<div className="img-panel">
									<img src="/img/card4.png" alt="card1" />
									<div className="circle1"></div>
									<div className="circle2"></div>
									<div className="circle3"></div>
								</div>
								<div>
									<h5 className='text-blue m0'>Auto Black Hole</h5>
									<p className='m0 mt1'>20% of sold amount are burned using the Black Hole (dEAd address). The more that is sold, the more that is put into the black hole. Causing the blackhole to inflate and magnify in size thus reducing the circulatingsupplyand keeping the Luzion Protocol value stable.</p>
								</div>
							</div>
						</div>
						<div>
							<div className="card">
								<div className="img-panel">
									<img src="/img/card5.png" alt="card1" />
									<div className="circle1"></div>
									<div className="circle2"></div>
									<div className="circle3"></div>
								</div>
								<div>
									<h5 className='text-blue m0'>Evoki Auto-Liquidity Engine (EALE)</h5>
									<p className='m0 mt1'>Liquidity allows for anybody to buy & sell their Evoki/BNB at anytime, however the less money/liquidity there is in the pool, the worse price you get.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</StyledPricingSection>
			<StyledFaqSection className="section-4" id="section-4">
				<div className="container" style={{ maxWidth: 1200 }}>
					<StyledTitle title="">Frequently asked question</StyledTitle>
					<div className="mt-1 d column middle">
						<div style={{ textAlign: 'center', maxWidth: 500 }}>Below we’ve provided a bit of ICO, ICO Token, cryptocurrencies, and few others. If you have any other questions, please get in touch using the contact form below.</div>
						<StyledCard className="back mt-2" style={{ padding: 0, maxWidth: 750 }}>
							{faqs.map((i, k) => (
								<StyledCardList>
									<div className="item" onClick={() => setStatus({ ...status, expand: status.expand === k ? -1 : k })}>
										<div className="content">
											<div className="desc" style={{ display: 'block', color: 'var(--text)' }}>{i.question}</div>
											<div className="detail" style={{ transition: '0.5s', transform: status.expand === k ? 'rotate(180deg)' : 'none' }}>
												<Icon icon="DownArrow" size={16} />
											</div>
										</div>
									</div>
									<StyledExpand className={status.expand === k ? 'expand' : ''}>
										<div style={{ padding: '0.5em 1.5em' }}>{i.answer}</div>
									</StyledExpand>
									{k !== (faqs.length - 1) && <hr style={{ margin: 0, height: 7, backgroundColor: 'var(--light-back)' }} />}
								</StyledCardList>
							))}
						</StyledCard>
					</div>
				</div>
			</StyledFaqSection>
			<StyledContactSection>
				<div className="container" style={{ maxWidth: 1200 }}>
					<StyledTitle title="Contact us">Contact us</StyledTitle>
					<div className="d column middle mt-1">
						<div>Any question? Reach out to us and we’ll get back to you shortly.</div>
						<div className="d middle gap mt-2">
							<Link to={config.links.facebook}>
								<StyledSocialButton><Icon icon="Facebook" size={24} /></StyledSocialButton>
							</Link>
							<Link to={config.links.twitter}>
								<StyledSocialButton><Icon icon="Twitter" size={24} /></StyledSocialButton>
							</Link>
							<Link to={config.links.youtube}>
								<StyledSocialButton><Icon icon="Youtube" size={24} /></StyledSocialButton>
							</Link>
							<Link to={config.links.linkedin}>
								<StyledSocialButton><Icon icon="Linkedin" size={24} /></StyledSocialButton>
							</Link>
							<Link to={config.links.telegram}>
								<StyledSocialButton><Icon icon="Telegram" size={24} /></StyledSocialButton>
							</Link>
							<Link to={config.links.medium}>
								<StyledSocialButton><Icon icon="Medium" size={24} /></StyledSocialButton>
							</Link>
						</div>
					</div>
				</div>
			</StyledContactSection>
		</Layout>
	)
}

export default Home;

const StyledHomeSection = styled.section`
	position: relative;
	.main {
		background-color: var(--green);
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
		padding: 3em 1.5em;
		border-radius: 1.5em;
	}

	.info {
		border: 1px solid var(--secondary);
		border-radius: 2em;
		background-color: var(--light-back);
		width: 100%;
		padding-right: 1em;
	}
	.title {
		@media (max-width: 760px) {
			flex-direction: column-reverse;
			text-align: center;
		}
	}
	.content {
		z-index: 5;
		.img-group {
			width: 100%;
			position: relative;
			animation-delay: 1.25s;
			animation-name: fadeInUp;
			animation-duration: 0.6s;
			z-index: 9;
			animation-fill-mode: both;
			margin: 0 -150px 0 -35px;
			@media (max-width: 992px) {
				margin: 0;
				max-width: 450px;
			}
			.main-img {
				width: 100%;
				height: auto;
			}
			.first-img {
				left: 43.75%;
    			animation: jumping 1s linear 0s infinite alternate;
				position: absolute;
				width: 4.2%;
				top: 32%;
			}
			.second-img {
				right: 40.25%;
				animation: jumping 1s linear .5s infinite alternate;
				position: absolute;
				width: 4.2%;
				top: 32%;
			}
			@keyframes fadeInUp {
				0% {
					opacity: 0;
					-webkit-transform: translate3d(0, 40px, 0);
					transform: translate3d(0, 40px, 0);
				}
				100% {
					opacity: 1;
					-webkit-transform: translate3d(0, 0, 0);
					transform: translate3d(0, 0, 0);
				}
			}
			@keyframes jumping {
				0% {
					transform: translateY(5px);
				}
				100% {
					transform: translateY(-25px);
				}
			}
		}
	}
	.background {
		z-index: 1;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 50% 50%;
		position: absolute;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		&:after {
			content: "";
			z-index: 1;
			position: absolute;
			bottom: -1px;
			left: -1px;
			top: 0;
			right: 0;
			background-repeat: no-repeat;
			background-size: cover;
			background-position: 50% 50%;
			
		}
		&:before {
			content: "";
			z-index: 1;
			position: absolute;
			bottom: -1px;
			left: -1px;
			top: 0;
			right: 0;
			background-size: contain;
			background-repeat: no-repeat;
			background-position: 50% 100%;
			/* background-image: url(./img/mask-c-dark.svg); */
		}
	}
`

const StyledEconomicsSection = styled.section`
	.timebar{
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			align-items: center;
			align-content: center	;
			justify-content: center;
			.timecard{
				padding: 0.5em;
				margin: 0.3em 0.1em;
				background-color: white;
				border-radius: 6px;
				color: #4e80ff;
				font-weight: bold;
				font-size: 2em;
				width: 60px;
				height: 70px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				text-align: center;
				cursor: pointer;
				transition: 0.3s;
				box-shadow: 1px 3px 3px rgb(21, 151, 207);
				&:hover{
					transform: translateY(-4px);
				}
			}
		}
`

const StyledAboutSection = styled.section`
	background-color: var(--white);
`

const StyledPricingSection = styled.section`
	
	.card{
			background-color: var(--green);
			padding: 1.5em;
			border-radius: 15px;
			cursor: pointer;
			transition: 0.3s;
			display: flex;
			justify-content: space-between;
			align-items: center;
			// flex-wrap: wrap;
			align-content: center;
			margin: 4em 0;
			border: 1px solid transparent;
			&:hover{
				background-color: var(--light-back);
				// border: 1px solid white;
				transform: translateX(5px) translateY(-2px);
				box-shadow: 1px 2px 2px #93d6ff;
			}
			.img-panel{
				border-radius: 50%;
				height: 80px;
				width: 80px;
				background-color: white;
				display: flex;
				justify-content: center;
				align-items: center;
				align-content: center;
				margin: 0.5em;
				margin-right: 2em;
				position: relative;
				.circle1{
					position: absolute;
					top: -1em;
					right: 0;
					width: 20px;
					height: 20px;
					border-radius: 50%;
					background-color: white;
					animation: animation-circle1 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
				}
				@keyframes animation-circle1 {
					from {background-color: rgba(255,255,255,0.1);}
					to {background-color: rgba(255,255,255,1);;}
				}				  
				.circle2{
					position: absolute;
					top: 1em;
					right: -10px;
					width: 10px;
					height: 10px;
					border-radius: 50%;
					background-color: white;
					animation: animation-circle1 1.2s cubic-bezier(0.2, 0.2, 0.3, 1) infinite;
				}	  
				.circle3{
					position: absolute;
					top: -1em;
					right: 2.2em;
					width: 10px;
					height: 10px;
					border-radius: 50%;
					background-color: white;
					animation: animation-circle1 1.2s cubic-bezier(0.2, 0.2, 0.3, 1) infinite;
				}
			}
			img{
				margin: 2em;
				display: block;
			}
			@media (max-width: 1024px) {
				display: block;
				margin-left: auto;
				margin-right: auto;
				text-align: center;
				.img-panel{
					margin-right: auto;
					margin-left: auto;
				}
			}
		}
`

const StyledRoadMapSection = styled.section`
	background-color: var(--green);
	.roadmap {
		position: relative;
		&:before {
			position: absolute;
			content: "";
			width: 1px;
			height: calc(100% + 30px);
			background: var(--primary);
			top: -30px;
			left: 50%;
			margin-left: -0.5px;
			bottom: 0;
			@media (max-width: 992px) {
				left: 0;
			}
		}
		.item {
			display: flex;
			.content {
				max-width: 50%;
				position: relative;
				.time {
					&.checked {
						&:after {
							content: "✓";
						}
					}
					&:after {
						color: white;
						background: var(--primary-hover);
						height: 19px;
						width: 19px;
						content: "";
						font-size: 14px;
						text-align: center;
						line-height: 20px;
						position: absolute;
						border: 1px solid var(--primary);
						border-radius: 50%;
					}
				}
			}
			&.left {
				margin-right: 58px;
				.content {
					.time {
						text-align: right;
						&:after {
							right: -40px;
    						left: auto;
						}
					}
				}
			}
			&.right {
				justify-content: flex-end;
				margin-left: 57px;
				.content {
					.time {
						&:after {
							left: -39px;
							top: 2px;
						}
					}
				}
			}
		}
		@media (max-width: 992px) {
			.item {
				justify-content: flex-start !important;
				margin-left: 29px !important;
				.content {
					max-width: 100%;
					.time {
						text-align: left !important;
						&:after {
							left: -39px !important;
							top: 2px !important;
						}
					}
				}
			}
		}
	}
`

const StyledPartnerSection = styled.section`
	background-color: var(--white);
	.partner-list {
		img {
			height: 50px;
			width: auto;
		}
	}
`

const StyledFaqSection = styled.section`
	background-color: var(--light-back);

`

const StyledContactSection = styled.section`
	background-color: var(--green);
`

const StyledTitle = styled.div<{ title: string }>`
	font-size: 40px;
	text-transform: uppercase;
	background-color: transparent;
    padding: 30px 0;
    margin-bottom: 0;
    opacity: 1;
    position: relative;
	font-weight: 500;
	display: flex;
	justify-content: center;
	z-index: 9;
	line-height: 1.2;
	text-align: center;
	overflow: hidden;
	&:before {
		content: attr(title);
		z-index: 1;
		font-size: 120px;
		font-weight: 700;
		opacity: 0.2;
		position: absolute;
		left: 50%;
		top: 50%;
		line-height: 0.9;
		text-transform: uppercase;
		white-space: nowrap;
		color: #28384c;
		transform: translate(-50%, -50%);
	}
`

const StyledParticle = styled.div`
		background-image: url(./img/main-bg.jpg);
		background-size: cover;
		height: calc(100vh - 80.4px);
		width: auto;
		@media (max-width: 1400px) {
			height: 110vh;
		}
	.top {
	}
    position: relative;
    .particle {
        position: absolute;
        left: 0;
        right: 0;
        height: 100%;
    }
`