import { http, createConfig } from '@wagmi/core'
import { mainnet, sepolia, bscTestnet } from '@wagmi/core/chains'

export const wagmiConfig = createConfig({
    chains: [bscTestnet],
    transports: {
        [bscTestnet.id]: http(),
    },
})


export const PresaleContract = "0x17bCBDF29991358c3aBBB38A86f64fe116e56Dd3"