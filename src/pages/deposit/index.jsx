

import BlackFancyPaper from 'components/Bridge/BlackFancyPaper';
import WalletConnect from './walletConnect'


function Index() {


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
             
           
              </div>
         <WalletConnect/>
            </div>
          </main>
        </BlackFancyPaper>
      </div>
    </section>
  );
}

export default Index;
