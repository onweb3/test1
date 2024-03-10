import React, { useState, useEffect } from "react";
import {
  connectWallet,
  disconnectWallet,
  getContractBalance,
  depositToContract,
  getDepositAmount,
  withdrawFromContract,
  getTokenBalance,
} from "utils/contract.js";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

const ConnectWallet = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [contractBalance, setContractBalance] = useState("");
  const [myBalance, setMyBalance] = useState("");
  const [walletConnectProvider, setWalletConnectProvider] = useState(null);

  // useEffect(() => {
  //   const loadWeb3 = async () => {
  //     if (window.ethereum) {
  //       const web3Instance = new Web3(window.ethereum);
  //       try {
  //         // Remove the automatic connection to Metamask
  //         // await window.ethereum.enable();

  //         setWeb3(web3Instance);
  //         const accounts = await web3Instance.eth.getAccounts();
  //         updateContractBalance();
  //         updateMyBalance();
  //         setAccount(accounts[0]);
  //       } catch (error) {
  //         console.error("Error connecting to wallet:", error);
  //       }
  //     } else {
  //       console.error("No wallet detected");
  //     }
  //   };
  //   loadWeb3();
  // }, []);

  const connectWalletManually = async (providerName) => {
    try {
      let provider;

      if (providerName === "metamask") {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.enable();
          provider = web3Instance.currentProvider;
        } else {
          console.error("Metamask not detected");
          return;
        }
      } else if (providerName === "walletconnect") {
        provider = new WalletConnectProvider({
          infuraId: "e7443ae019774e57864b56c0999a3fd5", // Replace with your Infura API key
        });
        await provider.enable();
      }

      const web3Instance = new Web3(provider);
      setWeb3(web3Instance);

      const accounts = await web3Instance.eth.getAccounts();
      updateContractBalance();
      updateMyBalance();
      setAccount(accounts[0]);
      setWalletConnectProvider(provider);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };
  const disconnectWalletManually = () => {
    if (walletConnectProvider) {
      try {
        if (walletConnectProvider.close) {
          walletConnectProvider.close();
        } else if (walletConnectProvider.disconnect) {
          walletConnectProvider.disconnect();
        }
      } catch (error) {
        console.error("Error disconnecting from WalletConnect:", error);
      } finally {
        setWalletConnectProvider(null);
      }
    }
    disconnectWallet(); 
  };

  const handleMaxButtonClick = async () => {
    try {
      // Ensure that the web3 object is initialized
      if (!web3) {
        console.error("Web3 not initialized");
        return;
      }

      const isValidAddress = web3.utils.isAddress(account);

      if (!isValidAddress) {
        console.error("Invalid Ethereum address:", account);
        return;
      }

      const myTokenBal = await getTokenBalance(account);
      setAmount(myTokenBal);
    } catch (error) {
      console.error("Error updating balance:", error);
    }
  };

  const handleDepositButtonClick = async () => {
    try {
      await depositToContract(amount);
      // You might want to refresh the UI or show a success message here
    } catch (error) {
      console.error("Error depositing to contract:", error);
      // Handle error, show an error message, etc.
    }
  };

  const handleGetwithdraw = async () => {
    try {
      await withdrawFromContract(amount);
      // You might want to refresh the UI or show the balance in your app
    } catch (error) {
      console.error("Error getting contract balance:", error);
      // Handle error, show an error message, etc.
    }
  };
  const updateContractBalance = async () => {
    const balance = await getContractBalance();
    setContractBalance(balance);
  };
  const updateMyBalance = async () => {
    try {
      if (!web3) {
        console.error("Web3 not initialized");
        return;
      }

      const isValidAddress = web3.utils.isAddress(account);

      if (!isValidAddress) {
        console.error("Invalid Ethereum address:", account);
        return;
      }

      const mywalletBal = await getDepositAmount(account);
      setMyBalance(mywalletBal);
    } catch (error) {
      console.error("Error updating balance:", error);
    }
  };
  console.log();
  return (
    <div className=" ">
      <div className="  rounded shadow-md">
        
        <div className="mb-4">
        
          <p className="text-white text-center py-1">
            Total Deposited {contractBalance} Deelance
          </p>
          <p className="text-white text-center py-2">You deposited {myBalance} deelance</p>
        <div className=" bg-white text-center py-1 px-4 rounded-full flex items-center ">

        <input
            type="number"
            id="amount"
            className="w-full  text-black p-2  rounded focus:outline-none focus:border-blue-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
             <button
            className=" text-black px-4 py-2 font-semibold focus:outline-none rounded-full bg-green "
            onClick={handleMaxButtonClick}
          >
            Max
          </button>
        </div>
        </div>
        <div className="flex items-center justify-center space-x-2 mb-4">
       
          <button
            className=" bg-green  text-black font-medium px-4 py-2 rounded-full focus:outline-none"
            onClick={handleDepositButtonClick}
          >
            Deposit
          </button>
          <button
            className=" bg-light-green text-black font-medium text-sm px-4 py-2 rounded-full focus:outline-none"
            onClick={handleGetwithdraw}
          >
            Withdraw-OwnerOnly
          </button>
        </div>
        <div className=" ">
      <div className="  rounded shadow-md">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <button
            className="bg-blue-500 text-white font-medium px-4 py-2 rounded-full focus:outline-none"
            onClick={() => connectWalletManually("metamask")}
          >
            Connect Metamask
          </button>
          <button
            className="bg-green-500 text-white font-medium px-4 py-2 rounded-full focus:outline-none"
            onClick={() => connectWalletManually("walletconnect")}
          >
            Connect WalletConnect
          </button>
          {web3 && (
            <button
              className="bg-red-500 text-white font-medium px-4 py-2 rounded-full focus:outline-none"
              onClick={disconnectWalletManually}
            >
              Disconnect
            </button>
          )}
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
