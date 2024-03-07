import { ethers } from "ethers";
import { useContractRead, useProvider } from "wagmi";


import ERC20TokenABI from "../contract/compile/mockErc20.json";

async function getERC20TokenBalance(tokenAddress, accountAddress) {
  try {
    const { data: signer } = useProvider();

    const erc20TokenContract = new ethers.Contract(tokenAddress, ERC20TokenABI, signer);

    const balance = await erc20TokenContract.balanceOf(accountAddress);

    console.log(`Current Balance of ${tokenAddress} for ${accountAddress}:`, balance.toString());

    return balance.toString();
  } catch (error) {
    console.error("Error getting ERC-20 token balance:", error);
    return "0";
  }
}

export { getERC20TokenBalance };
