// src/components/ConnectWallet.js
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
const ConnectWallet = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [contractBalance, setContractBalance] = useState("");
  const [myBalance, setMyBalance] = useState("");

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          setWeb3(web3Instance);
          const accounts = await web3Instance.eth.getAccounts();
          updateContractBalance();
          updateMyBalance();
          setAccount(accounts[0]);
        } catch (error) {
          console.error("Error connecting to wallet:", error);
        }
      } else {
        console.error("No wallet detected");
      }
    };
    loadWeb3();
  }, []);

  const handleMaxButtonClick = async () => {
    try {
      // Ensure that the web3 object is initialized
      if (!web3) {
        console.error("Web3 not initialized");
        return;
      }

      // Ensure that the account variable is a valid Ethereum address
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
      // Ensure that the web3 object is initialized
      if (!web3) {
        console.error("Web3 not initialized");
        return;
      }

      // Ensure that the account variable is a valid Ethereum address
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
            className=" bg-green  text-black font-medium px-4 py-2 rounded focus:outline-none"
            onClick={handleDepositButtonClick}
          >
            Deposit
          </button>
          <button
            className=" bg-light-green text-black font-medium text-sm px-4 py-2 rounded focus:outline-none"
            onClick={handleGetwithdraw}
          >
            Withdraw-OwnerOnly
          </button>
        </div>
        {web3 ? (
          <p className="text-black text-center">Connected to wallet. Account: {account}</p>
        ) : (
          <p className=" text-center">Connect your wallet to proceed</p>
        )}
      </div>
    </div>
  );
};

export default ConnectWallet;
