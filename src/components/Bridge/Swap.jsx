import { FaExchangeAlt, FaInfoCircle } from "react-icons/fa";
import BlackFancyPaper from "./BlackFancyPaper";
import Input from "./Input";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { useAccount, useSwitchNetwork } from "wagmi";
import { useEffect, useState } from "react";
// import { ConnectButton } from "components/ConnectButton";
import Link from "next/link";

const TitleValue = ({ title, value }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-1 sm:space-y-0">
      <p>{title}</p>
      <p>{value}</p>
    </div>
  );
};

const defaultQueryFn = async ({ queryKey }) => {
  const userAddress = queryKey[1];

  const { data } = await axios.post(
    `https://admin-bridge.deelance.com/deelance/check_balance/`,
    {
      rpc: "https://ethereum.publicnode.com",
      account_details: userAddress,
      account_address: userAddress,
      source_network: 1,
      destination_network: 2,
      amount: 0.00000005,
      receivable: 0.00000002,
      source_currency: 1,
      destination_currency: 1,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

function Swap() {
  const [inWardNetworks, setInwardNetworks] = useState(null);

  const [inwardNetworkValue, setInWardNetworkValue] = useState(undefined);

  const handleInWardValueChange = (e) => {
    console.log(e.target.value);
  };

  const initialInputs = [
    <Input
      key="from"
      id="from"
      placeholder="ETHEREUM MAINNET"
      value="ETHEREUM MAINNET"
    />,
    <Input
      as="select"
      key="to"
      id="to"
      value={inwardNetworkValue}
      onChange={handleInWardValueChange}
      className="[&>*]:bg-main-bg"
    >
      <option value="">DeeLance Network (DEE)</option>
      {inWardNetworks?.map((item, i) => (
        <option key={i} value={item.network_name}>
          {item.network_name}
        </option>
      ))}
    </Input>,
  ];

  console.log("inWardNetworks");
  console.log(inWardNetworks);

  const { address, isConnected } = useAccount();
  const [inputeReversed, setInputReversed] = useState(false);
  const [inputs, setInputs] = useState(initialInputs);

  const { data, isLoading } = useQuery({
    queryFn: defaultQueryFn,
    queryKey: ["TTT", address],
    enabled: isConnected === true && address ? true : false,
  });

  const handleSwitchInputs = () => {
    setInputReversed((val) => !val);
  };

  const getInwardNetworks = async () => {
    try {
      const res = await axios.get(
        "https://admin-bridge.deelance.com/deelance/network_list/?type=inward"
      );
      setInwardNetworks(await res.data.inward);
    } catch (error) {
      console.log("error ===");
      console.log(error);
    }
  };

  useEffect(() => {
    if (inputeReversed) {
      setInputs(Array.from(initialInputs).reverse());
    } else {
      setInputs(Array.from(initialInputs));
    }
  }, [inputeReversed]);

  useEffect(() => {
    getInwardNetworks();
  }, []);

  return (
    <div>
      <h1 className="text-center text-3xl mb-10 border-b-2 w-fit mx-auto border-main-green font-bold">
        BRIDGE
      </h1>
      <main className="max-w-[40rem] mx-auto w-full">
        <BlackFancyPaper>
          <main className="p-8">
            <div className="mb-6">
              <label htmlFor="send" className="mb-3 flex">
                Send
              </label>
              <div className="flex items-center space-x-4">
                <Input
                  id="send"
                  placeholder="Enter Amount"
                  className="flex-1"
                />
                <p className="font-bold text-xl sm:text-2xl">$Dlance</p>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor={inputs[0].id} className="flex mb-2">
                From
              </label>

              {/* {inputs[0]} */}
              <Input
                key="from"
                id="from"
                placeholder="ETHEREUM MAINNET"
                value="ETHEREUM MAINNET"
              />
            </div>

            <div className="mb-2 relative">
              <button
                onClick={handleSwitchInputs}
                className="absolute top-0 left-1/2 -translate-x-1/2"
              >
                <FaExchangeAlt className="rotate-90 text-lg" />
              </button>

              <label htmlFor={inputs[1].id} className="flex mb-2">
                To
              </label>
              {/* {inputs[1]} */}
              <Input
                as="select"
                key="to"
                id="to"
                value={inwardNetworkValue}
                onChange={handleInWardValueChange}
                className="[&>*]:bg-main-bg"
              >
                <option value="">DeeLance Network (DEE)</option>
                {inWardNetworks?.map((item, i) => (
                  <option key={i} value={item.network_name}>
                    {item.network_name}
                  </option>
                ))}
              </Input>
            </div>

            <button className="flex w-fit ml-auto">Change Account</button>
          </main>
        </BlackFancyPaper>

        <BlackFancyPaper className="mt-10">
          <main className="p-8">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-7 space-y-1 sm:space-y-0">
              <p className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 text-white-60">
                <FaInfoCircle className="relative top-[.26em]" />{" "}
                <span>All transfers are slippage free.</span>
              </p>

              <Link href="/" className="text-blue underline flex w-fit">
                Learn More
              </Link>
            </header>

            {isConnected ? (
              <>
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <div className="space-y-4 sm:space-y-3">
                    {/* <TitleValue title="Time to DeeLance Network  " value="--" />
                    <TitleValue title="Destination gas fee" value="--" />
                    <TitleValue title="Bridge fee" value="--" />
                    <TitleValue title="You will receive" value="--" /> */}

                    <TitleValue title="Accound Balance" value={data?.balance} />
                  </div>
                )}
              </>
            ) : (
              <p className="text-center">Please Connect Wallet</p>
            )}
          </main>
        </BlackFancyPaper>

        <div className="text-[86%] sm:text-[100%]">
          {/* <ConnectWalletButton  /> */}
          {/* <ConnectButton className="mt-5 w-full text-black-100 hover:text-white-100 rounded-lg" /> */}
        </div>
      </main>
    </div>
  );
}

export default Swap;
