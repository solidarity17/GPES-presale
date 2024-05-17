import { Link } from "react-router-dom";
import { styled } from "styled-components";
import Icon from "../components/icons";
import config from '../context/config.json'
import { StyledButton, StyledSocialButton } from "@/components/buttons";

export const Footer = () => {

	return (
		<div>
			<StyledFooter>
				<div className="container">
					<StyledLink className="row p-1">
						<div className="col-lg-5 col-md-6 d column gap mt-2">
							<div className="d middle gap" >
								<Link to='/' className="d middle gap" style={{ color: 'var(--text)' }}>
									<img src="./logo1.png" alt="logo" style={{width: 100, height: 'auto'}} />
								</Link>
							</div>
							<div>Green Energy Power Station</div>
							<div className="d middle gap">
								<Link to={config.links.facebook}>
									<StyledSocialButton><Icon icon="Facebook" size={18} /></StyledSocialButton>
								</Link>
								<Link to={config.links.twitter}>
									<StyledSocialButton><Icon icon="Twitter" size={18} /></StyledSocialButton>
								</Link>
								<Link to={config.links.youtube}>
									<StyledSocialButton><Icon icon="Youtube" size={18} /></StyledSocialButton>
								</Link>
								<Link to={config.links.linkedin}>
									<StyledSocialButton><Icon icon="Linkedin" size={18} /></StyledSocialButton>
								</Link>
								<Link to={config.links.telegram}>
									<StyledSocialButton><Icon icon="Telegram" size={18} /></StyledSocialButton>
								</Link>
								<Link to={config.links.medium}>
									<StyledSocialButton><Icon icon="Medium" size={18} /></StyledSocialButton>
								</Link>
							</div>
						</div>
						<div className="col-lg-7 col-md-6 col-sm-12">
							<div className="row">
								<div className="col-md-5 col-6 d column gap mt-2">
									<div className="h6">Quick Links</div>
									<Link to={"/"} style={{color: "var(--border)"}}>Home</Link>
									<Link to="/white-2.pdf" target="_blank" style={{color: "var(--border)"}}>Whitepaper</Link>
									<Link to='/staking' style={{color: "var(--border)"}}>Staking</Link>
								</div>
								<div className="col-md-5 col-6 d column gap mt-2">
									<div className="h6">Subscribe</div>
									<div>Follow our newsletter to stay updated about us.</div>
									<Link to={`${config.links.telegram}`}>
										<StyledButton className="back">Follow us</StyledButton>
									</Link>
								</div>
							</div>
						</div>
					</StyledLink>
				</div>
				<StyledHr className="mt-2" />
				<div className="text-center pt-1 pb-1" style={{ fontWeight: '500', backgroundColor: "var(--secondary)" }}>@{new Date().getUTCFullYear()} Green Energy Power Station</div>
			</StyledFooter>
		</div>
	)
}

const StyledHr = styled.div`
	width: 100%;
	height: 3px;
	background-color: var(--green);
`

const StyledLink = styled.div`
	a {
		transition: all 0.3s ease;
		&:hover {
			color: var(--primary);
		}
	}
`

const StyledFooter = styled.div`
	background-color: var(--light-back);
	color: var(--text);
	a {
		color: var(--gray-text);
		font-weight: 400;
	}
	@media (max-width: 576px) {
		padding-bottom: 2em;
	}
	.h6 {
		font-weight: 700;
		margin-bottom: 8px;
		position: relative;
		color: var(--hover);
		&::after {
			position: absolute;
			top: 105%;
			left: 0;
			width: 60px;
			content: '';
			height: 1px;
			background-color: var(--primary);
		}
	}
`