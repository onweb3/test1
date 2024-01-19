// import GasPrice from "components/GasPrice";
// import SwapGraphBox from "components/SwapGraphBox";
// import Wrapper from "components/Wrapper";
import React, { createContext, useState } from "react";

export const MYContext = createContext(true);
function SwapLayout({ children }) {
  let [showSwap, setShowSwap] = useState(true);
  return (
    <div className="flex justify-center items-center  mx-auto p-1 h-[100vh] ">

      <MYContext.Provider value={{ showSwap, setShowSwap }}>
        <div
          className={`${
            showSwap ? " md:col-span-3 transition-[" : "md:col-span-5 transition-all"
          } h-auto flex flex-col `}
        >
          {/* <SwapGraphBox showSwap={showSwap} /> */}
          {/* <div className="hidden sm:grid grid-cols-2 gap-1 flex-1 pt-1">
            <GasPrice />
            <GasPrice />
          </div> */}
        </div>
        {children}
      </MYContext.Provider>
    </div>
  );
}

export default SwapLayout;
