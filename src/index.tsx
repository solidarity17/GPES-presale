import { BrowserRouter } from 'react-router-dom';
import { createRoot } from "react-dom/client";

import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { WagmiProvider } from 'wagmi'
import { bscTestnet } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from '@/context';
import App from './app';

import './index.scss';
import { Header } from './layout/header';
import { Footer } from './layout/footer';

const queryClient = new QueryClient();
const projectId = 'af50b3bc3ff616cfe6a117257dafb664';
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [ bscTestnet ] as const;
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableWalletConnect: false,
  enableInjected: false,
  enableEIP6963: true,
  enableCoinbase: false,
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true
});

createRoot(document.getElementById("root") as HTMLElement).render(
	<WagmiProvider config={config}>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Provider>
          <Header />
					<App />
          <Footer />
				</Provider>
			</BrowserRouter>
		</QueryClientProvider>
	</WagmiProvider>
);