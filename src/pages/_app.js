import "styles/globals.css";
import localFont from "next/font/local";
import SidebarLayout from "layout/SidebarLayout";



import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { memo } from "react";


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
  
    <div className={`${RedHatFont.variable} ${Moment.variable}`}>
      {getLayout(<Component {...pageProps} />)}

    </div>
  



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
