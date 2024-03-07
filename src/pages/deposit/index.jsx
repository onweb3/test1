import React, { useState, useEffect } from 'react';
import { ConnectButton } from 'components/ConnectButton';
import BlackFancyPaper from 'components/Bridge/BlackFancyPaper';
import Button from 'components/Button';
import { useAccount } from 'wagmi';
import useDepositContract from '../../helpers/scHelper.js'; 
import { getERC20TokenBalance } from 'helpers/getBalance.js';
function Index() {
  const { isConnected, address } = useAccount();
  const availableBalance = getERC20TokenBalance(process.env.DEPOSIT_TOKEN, address);
  const depositContract = useDepositContract();
  const [inputAmount, setInputAmount] = useState('');
  const [totalDepositedTokens, setTotalDepositedTokens] = useState(0);

  useEffect(() => {
    updateTotalDepositedTokens();
  }, []);

  const updateTotalDepositedTokens = async () => {
    if (isConnected) {
      try {
        const depositedAmount = await depositContract.getTotalDepositedAmount();
        setTotalDepositedTokens(depositedAmount);
      } catch (error) {
        console.error('Error fetching total deposited tokens', error);
      }
    }
  };

  const handleMaxClick = () => {
           const maxAmount = availableBalance;
           setInputAmount(maxAmount);
  };

  const handleDepositClick = async () => {
    if (isConnected) {
      try {
        const amountToDeposit = parseFloat(inputAmount);
        await depositContract.deposit(amountToDeposit);
        updateTotalDepositedTokens();
      } catch (error) {
        console.error('Error depositing tokens', error);
      }
    }
  };

  return (
    <section className="flex justify-center items-center sm:h-[100vh] h-auto">
      <div className="sm:max-w-[472px] w-full bg-main-bg mx-auto">
        <BlackFancyPaper>
          <main className="p-8">
            <div className="mb-6">
              <div>
                <h1 className="text-center text-3xl mb-10 border-b-2 w-fit mx-auto border-main-green font-bold">
                  Deposit Here
                </h1>
                <p>Total Deposited Tokens: {totalDepositedTokens}</p>
                <p className="">Available balance : {availableBalance}</p>
              </div>
              <div className="border-1 border-white-60 px-4 sm:px-6 bg-transparent w-full rounded-md my-4 flex justify-between items-center">
                <input
                  type="number"
                  name=""
                  id=""
                  className="text-white bg-transparent outline-none border-none h-10"
                  value={inputAmount}
                  onChange={(e) => setInputAmount(e.target.value)}
                />
                <Button className="my-2" onClick={handleMaxClick}>
                  Max
                </Button>
              </div>
              <div>
                {isConnected ? (
                  <Button onClick={handleDepositClick}>Approve and Deposit</Button>
                ) : (
                  <ConnectButton className="mt-5 w-full text-black-100 hover:text-white-100 rounded-lg" />
                )}
              </div>
            </div>
          </main>
        </BlackFancyPaper>
      </div>
    </section>
  );
}

export default Index;
