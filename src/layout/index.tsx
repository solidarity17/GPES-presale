import React from 'react';
import styled from 'styled-components';
import { Helmet } from "react-helmet";

import { Header } from './header';
import { Footer } from './footer';

// import { MessageBox } from '@/components/messagebox/message-box';
import useSocket from '@/context/use-socket';

interface LayoutProps {
	meta?: {
		title: string
		desc: string
		image?: {
			src: string
			width: number
			height: number
		}
	}
	children?: React.ReactNode | React.ReactNode[]
}

const Layout = ({ meta, children }: LayoutProps) => {
	const { lang } = useSocket();
	const [toTop, setTop] = React.useState(false);

	const onScroll = () => {
		if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350) {
			setTop(true)
		}
		else {
			setTop(false)
		}
	}

	React.useEffect(() => {
		window.onscroll = onScroll;
	}, [])
	React.useEffect(() => {
		window.scroll({ top: 0, left: 0 })
	}, []);

	const title = meta?.title || "Green Energy Power Station";
	const desc = meta?.desc || "Green Energy Power Station";

	return (
		<>
			<Helmet>
				<html lang={lang} />
				<title>{title}</title>
				<meta name="description" content={desc} />
				<meta name="twitter:title" content={title} />
				<meta property="og:description" content={desc} />
				<meta property="og:image" content={meta?.image?.src || "./logo.png"} />
				<meta property="og:image:alt" content={title} />
				{meta?.image?.width && <meta property="og:image:width" content={`${meta.image.width}px`} />}
				{meta?.image?.height && <meta property="og:image:height" content={`${meta.image.height}px`} />}
				<meta property="og:title" content={title} />
			</Helmet>
			<div>
				{/* <Header /> */}
				<div className={`root`}>
					{children}
				</div >
				{/* <Footer /> */}
				<StyledToTop style={{ display: toTop ? 'flex' : 'none' }} onClick={() => { window.scroll({ top: 0, left: 0, behavior: 'smooth' }) }}>
					<img src="/img/top.svg" alt="to-top" width={25} height={25} loading='lazy' />
				</StyledToTop>
				{/* {(!!account?.isBuyer || !!account?.isSeller) && <MessageBox />} */}
			</div>
		</>
	)
}

export default Layout;

const StyledToTop = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	background-color: var(--primary);
	bottom: 32px;
	right: 32px;
	padding: 10px;
	width: 50px;
	height: 50px;
	border-radius: 10px;
	z-index: 100;
	cursor: pointer;
	transition: 0.25s ease-in-out;
	&:hover {
		transform: translateY(-10px);
	}
`
