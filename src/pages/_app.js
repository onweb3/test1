import "styles/globals.css";
import localFont from "next/font/local";
import SidebarLayout from "layout/SidebarLayout";
import { WagmiConfig } from "wagmi";
import { chains, config, web3modalClient } from "initwagmi.js";
import { Web3Modal } from "@web3modal/react";
import { EthereumClient } from "@web3modal/ethereum";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { memo } from "react";

const ethereumClient = new EthereumClient(web3modalClient, chains);
const toastStyle = { zIndex: 100000000000000000 };

const RedHatFont = localFont({
  src: "../../public/fonts/Red-Hat/RedHatDisplay-VariableFont_wght.ttf",
  variable: "--red-hat",
});
const Moment = localFont({
  src: [
    {
      path: "../../public/fonts/MonumentExtended/MonumentExtended-Regular.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/MonumentExtended/MonumentExtended-Ultrabold.otf",
      weight: "800",
    },
  ],
  variable: "--moment",
});

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout
    ? Component.getLayout
    : (page) => <SidebarLayout>{page}</SidebarLayout>;

  return (
    <>
    <WagmiConfig config={config}>
    <div className={`${RedHatFont.variable} ${Moment.variable}`}>
      {getLayout(<Component {...pageProps} />)}

    </div>
    </WagmiConfig>

    <Web3Modal
      projectId='0f54f4c2d5ee6ce8991cbf25774ad6d6'
      ethereumClient={ethereumClient}
    />

<ToastContainer
      style={toastStyle}
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    </>
  );
}
