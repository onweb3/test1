import React from 'react'
import { ConnectButton } from "components/ConnectButton";
import BlackFancyPaper from 'components/Bridge/BlackFancyPaper';
import Button from 'components/Button';

function index() {
  return (
   <section className=' flex justify-center items-center sm:h-[100vh] h-auto'>
 

 
    <div className="sm:max-w-[472px] w-full bg-main-bg mx-auto">
           <BlackFancyPaper>
           <main className="p-8">
            <div className="mb-6">
    <div>
    <h1 className="text-center text-3xl mb-10 border-b-2 w-fit mx-auto border-main-green font-bold">
            Deposit Here</h1>
    </div>
    <div className=' border-1 border-white-60 px-4 sm:px-6 bg-transparent w-full rounded-md  my-4 flex justify-between items-center'>
        
        <input type="number" name="" id="" className=' text-white bg-transparent outline-none border-none h-10' />
       <Button className='my-2'>
        Max
       </Button>
    </div>
    <div>
    <ConnectButton className="mt-5 w-full text-black-100 hover:text-white-100 rounded-lg" />
    </div>
    </div>
    </main>
    </BlackFancyPaper>
    </div>
   </section>
  )
}

export default index