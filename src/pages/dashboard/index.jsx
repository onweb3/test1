import React from "react";

function index() {
  return (
    <section className=" mx-auto flex justify-center items-center mt-12">
      <div className=" sm:bg-feature-card sm:py-6 lg:py-8 sm:px-8 lg:px-10 rounded-xl sm:border-2 border-main-green-shade-20">
        <h2 className=" my-4">Price : 0$</h2>
        <div className=" flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className=" border-2 rounded-xl p-4 w-[200px] ">
            <p className="text-sm xl:text-base font-semibold opacity-60 mb-3 xl:mb-4">
            Dee  Holding
            </p>

            <h2 className="font-bold text-base sm:text-lg xl:text-2xl text-main-green">
              0 DEE
            </h2>
          </div>

          <div className=" border-2 rounded-xl p-4   w-[200px]">
            <p className="text-sm xl:text-base font-semibold opacity-60 mb-3 xl:mb-4">
              Staked Dee
            </p>

            <h2 className="font-bold text-base sm:text-lg xl:text-2xl text-main-green">
              0 DEE
            </h2>
          </div>

          <div className=" border-2 rounded-xl p-4  w-[200px] ">
            <p className="text-sm xl:text-base font-semibold opacity-60 mb-3 xl:mb-4">
              Active Staked Coin
            </p>

            <h2 className="font-bold text-base sm:text-lg xl:text-2xl text-main-green">
              0 DEE
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

export default index;
