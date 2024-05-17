import { StyledButton } from "@/components/buttons";
import React from "react";
import styled from "styled-components";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const data1 = [
    { label: 'Jan', Rewards: 80 },
    { label: 'Feb', Rewards: 83 },
    { label: 'Mar', Rewards: 86 },
    { label: 'Apr', Rewards: 89 },
    { label: 'May', Rewards: 92 },
    { label: 'June', Rewards: 95 },
    { label: 'July', Rewards: 98 },
    { label: 'Aug', Rewards: 100 },
    { label: 'Sep', Rewards: 100 },
    { label: 'Oct', Rewards: 100 },
    { label: 'Nov', Rewards: 100 },
    { label: 'Dec', Rewards: 100 },
    { label: 'Jan', Rewards: 100 },
    { label: 'Feb', Rewards: 100 },
    { label: 'Mar', Rewards: 100 },
    { label: 'Apr', Rewards: 100 },
    { label: 'May', Rewards: 100 },
    { label: 'June', Rewards: 100 },
    { label: 'July', Rewards: 100 },
    { label: 'Aug', Rewards: 100 },
    { label: 'Sep', Rewards: 100 },
    { label: 'Oct', Rewards: 100 },
    { label: 'Nov', Rewards: 100 },
    { label: 'Dec', Rewards: 100 },
    { label: 'Jan', Rewards: 100 },
    { label: 'Feb', Rewards: 100 },
    { label: 'Mar', Rewards: 100 },
    { label: 'Apr', Rewards: 100 },
    { label: 'May', Rewards: 100 }
];

const Staking = () => {
    return(
        <StyledMain>
            <div style={{backgroundColor: "var(--green)"}}>
                <div className="container pt-5 pb-3">
                    <div className="row d middle">
                        <div className="col-lg-8 col-md-12">
                            <h3>WELCOME TO $GREEN ENERGY TOKENS</h3>
                            <p className="mt-2" style={{fontSize: "1.2em"}}>$TUK token rewards will be distributed to users at a rate of 4.75 $TUK per BSC block. Rewards will be payable over 3 years and are determined by your share of the staking pool and annual returns percentage.</p>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <StyledButton>WITHDRAW STAKED TOKENS</StyledButton>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="card">
                                <p className="title">STAKED BALANCE</p>
                                <p className="p1">0 <span><sup style={{color: "var(--border)", fontSize: "15px"}}>GE</sup></span></p>
                                <p className="title">YOUR STAKEABLE</p>
                                <p className="p1">0 <span><sup style={{color: "var(--border)", fontSize: "15px"}}>GE</sup></span></p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="card">
                                <p className="title">% OF POOL</p>
                                <p className="p1" style={{color: "var(--border)", }}>0 %</p>
                                <p className="title mt-1">TOTAL STAKED</p>
                                <p className="p1">45,543,241<span><sup style={{color: "var(--border)", fontSize: "15px"}}> GE</sup></span></p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="card">
                                <p className="title">ESTIMATED REWARDS</p>
                                <p className="p1" style={{color: "var(--border)"}}>84%</p>
                                <p className="title mt-1">CURRENT REWARDS</p>
                                <p className="p1" style={{color: "var(--border)"}}>4.75<span><sup style={{color: "var(--border)", fontSize: "15px"}}> Per BSC Block</sup></span></p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="card">
                                <p  className="title">TOTAL REWARDS</p>
                                <p className="p1" style={{color: "var(--border)"}}>4.75<span><sup style={{color: "var(--border)", fontSize: "15px"}}> Per BSC Block</sup></span></p>
                                <StyledButton className="mt-2">CLAIM REWARDS</StyledButton>
                            </div>
                        </div>
                    </div>  
                </div>   
            </div>

            <div className="container mt-2 mb-3">
                <div className="row d middle">
                    <div className="col-lg-6 col-md-6 col-sm-12 chat text-center mt-3">
                        <h4>TOTAL SUPPLY</h4>
                        <div className="mt-2">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={data1} margin={{ top: 15, right: 0, bottom: 15, left: 0 }}>
                                <XAxis dataKey="label" />
                                <YAxis />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <Tooltip />
                                <Legend/>
                                <Bar dataKey="Rewards" fill="var(--primary)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 text-center mt-3">
                        <img src="/logo1.png" alt="logo" width={150} height={150}/>
                    </div>
                
                </div>              
            </div>
        </StyledMain>
    )
}

export default Staking

const StyledMain = styled.div`
    
    .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        border-radius: 1em;
        margin: 10px 0px;
        padding: 1.5em 2em;
        height: 13em;
        .title {
            margin-block-start: 3px;
            margin-block-end: 3px;
        }
    }

    .chat {
        box-shadow: 0 4px 8px 0 rgba(42, 110, 51, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        border-radius: 1em;
        padding: 3em 3em 2em 2em;
    }
    
`