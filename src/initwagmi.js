import { w3mConnectors } from "@web3modal/ethereum";
import { createConfig, configureChains, mainnet } from "wagmi";
import { bsc, bscTestnet, polygon, goerli } from "wagmi/chains";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

const customChains = [
  mainnet,
  bsc,
  goerli,
  ...(import.meta.env?.MODE === "development" ? [bsc, polygon, bscTestnet, goerli] : []),
];

const customProviders = [
  infuraProvider({
    apiKey: '7b50cd907db34540b993f3209ba55488',
  }),
  publicProvider(),
  // Add other providers if needed
];

const { chains, publicClient, webSocketPublicClient } = configureChains(customChains, customProviders);

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

export const web3modalClient = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({
    projectId: '0f54f4c2d5ee6ce8991cbf25774ad6d6',
    chains,
  }),
  publicClient,
});

export { chains };
