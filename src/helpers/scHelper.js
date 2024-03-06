import Web3 from 'web3';
import DepositContractABI from '../contract/compile/depositContract.json';
import ERC20TokenABI from '../contract/compile/mockErc20.json'; // Import ERC-20 Token ABI

const contractAddress = process.env.DEPOSIT_CONTRACT;
const web3 = new Web3(window.ethereum);
const depositContract = new web3.eth.Contract(DepositContractABI, contractAddress);

// function to deposit the erc20 token current data is goerli testnet
async function depositTokensWithApproval(amount) {
  try {
    const accounts = await web3.eth.requestAccounts();
    const sender = accounts[0];

    const tokenAddress = process.env.DEPOSIT_TOKEN;



    const erc20TokenContract = new web3.eth.Contract(ERC20TokenABI, tokenAddress);

    const currentAllowance = await erc20TokenContract.methods.allowance(sender, contractAddress).call();

    if (currentAllowance < amount) {
      const approvalResult = await erc20TokenContract.methods.approve(contractAddress, amount).send({ from: sender });
      console.log('erc20 token approved.', approvalResult);
    }

    const depositResult = await depositContract.methods.deposit(amount).send({ from: sender });
    console.log('token deposited', depositResult);
  } catch (error) {
    console.error('something went wrong - deposittokenwithapproval', error);
  }
}

// function to withdraw tokens this is only for owner
async function withdrawTokens(amount) {
  try {
    const accounts = await web3.eth.requestAccounts();
    const owner = accounts[0];


    const result = await depositContract.methods.withdraw(amount).send({ from: owner });
    console.log('token successfully withdrwan', result);
  } catch (error) {
    console.error('smoething went wrong - withdrawtoken', error);
  }
}

// function to get the number of depositors
async function getNumDepositors() {
  try {
    const result = await depositContract.methods.getNumDepositors().call();
    console.log('total no of wallet deposited:', result);

  } catch (error) {
    console.error('something went wrong - getnumdeposit', error);
  }
}

// function to get a depositor at a specific index
async function getDepositorAtIndex(index) {
  try {
    const result = await depositContract.methods.getDepositorAtIndex(index).call();
    console.log(` ${index}:`, result);

  } catch (error) {
    console.error('wrong index', error);
  }
}

// function to get all depositors in an array
async function getAllDepositors() {
  try {
    const result = await depositContract.methods.getAllDepositors().call();
    
    console.log('depostor:', result);


  } catch (error) {
    console.error('something went wrong - get all depositor', error);
  }
}

// function to get deposited amount for a specific depositor
async function getDepositedAmount(depositor) {
  try {
    const result = await depositContract.methods.getDepositedAmount(depositor).call();
    console.log(`Deposited amount for ${depositor}:`, result);
  } catch (error) {
    console.error('deposit not found', error);
  }
}

// export functions for use in your DApp
export {
  depositTokensWithApproval,
  withdrawTokens,
  getNumDepositors,
  getDepositorAtIndex,
  getAllDepositors,
  getDepositedAmount
};
