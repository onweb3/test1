import { useReadContracts, useWriteContracts } from "wagmi";
import DepositContractABI from '../contract/compile/depositContract.json';
import ERC20TokenABI from '../contract/compile/mockErc20.json';

const contractAddress = process.env.DEPOSIT_CONTRACT;
const erc20TokenAddress = process.env.DEPOSIT_TOKEN;

function useDepositContract() {
  const readContract = useReadContracts(DepositContractABI, contractAddress);
  const writeContract = useWriteContracts(DepositContractABI, contractAddress);
  const erc20TokenContract = useWriteContracts(ERC20TokenABI, erc20TokenAddress);

  async function approve(amount) {
    try {
      const accounts = await readContract.eth.requestAccounts();
      const sender = accounts[0];

      // Approve the contract to spend the user's tokens
      await erc20TokenContract.methods.approve(contractAddress, amount).send({ from: sender });
      console.log('Approval successful');
    } catch (error) {
      console.error('Error approving tokens:', error);
    }
  }

  async function deposit(amount) {
    try {
      const accounts = await readContract.eth.requestAccounts();
      const sender = accounts[0];
      const allowance = await readContract.methods.allowance(sender, contractAddress).call();

      if (allowance < amount) {
        await approve(amount);
      }
      const result = await writeContract.methods.deposit(amount).send({ from: sender });
      console.log('Deposit successful:', result);
    } catch (error) {
      console.error('Error depositing tokens:', error);
    }
  }

  async function getDepositAmount(depositor) {
    try {
      const result = await readContract.methods.getDepositAmount(depositor).call();
      console.log(`Deposit amount for ${depositor}:`, result);
    } catch (error) {
      console.error('Error getting deposit amount:', error);
    }
  }
//only owner -> create a protected path to use this on owner wallet only
  async function withdraw(amount) {
    try {
      const accounts = await readContract.eth.requestAccounts();
      const owner = accounts[0];

      const result = await writeContract.methods.withdraw(amount).send({ from: owner });
      console.log('Withdrawal successful:', result);
    } catch (error) {
      console.error('Error withdrawing tokens:', error);
    }
  }

  async function getTotalDepositedAmount() {
    try {
      const result = await readContract.methods.getTotalDepositedAmount().call();
      console.log('Total deposited amount:', result);
    } catch (error) {
      console.error('Error getting total deposited amount:', error);
    }
  }

  async function getERC20Balance(account) {
    try {
      const balance = await erc20TokenContract.methods.balanceOf(account).call();
      console.log(`ERC20 balance for ${account}:`, balance);
    } catch (error) {
      console.error('Error getting ERC20 balance:', error);
    }
  }


  return {
    deposit,
    getDepositAmount,
    withdraw,
    getTotalDepositedAmount,
    getERC20Balance,
  };
}

export default useDepositContract;
