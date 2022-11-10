import { useState } from 'react'
import {ethers} from 'ethers'

function App() {

	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
  const [networkId, setNetworkId] = useState("");

  const connectWallet = () => {
    if(window.ethereum){
      window.ethereum.request({method: 'eth_requestAccounts'})
      .then(result => {
        accountAddress(result[0]);
        setConnButtonText('Wallet Connected');
        getAccountBalance(result[0]);
      })
    }else {
      alert("Please Install Metamask")
    }
  }

  const accountAddress = (accountAdd) => {
    setDefaultAccount(accountAdd);
		getAccountBalance(accountAdd.toString());
    if(chainId === "5") {
      setNetworkId("Georli Test Network");
    } else if(chainId === "1") {
      setNetworkId("Ethereum Main Network");
    } else if(chainId === "3") {
      setNetworkId("Ropsten Test Network");
    } else if(chainId === "4") {
      setNetworkId("Rinkeby Test Network");
    } else if(chainId === "42") {
      setNetworkId("Kovan Test Network");
    } else{
      setNetworkId(chainId)
    }
  }

  
  const getAccountBalance = (account) => {
		window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
		.then(balance => {
			setUserBalance(ethers.utils.formatEther(balance));
		})
		.catch(error => {
			console.log(error);
		});
	};

  const chainId = window.ethereum.networkVersion;
  

  const chainChangedHandler = () => {
		window.location.reload();
	}


	window.ethereum.on('accountsChanged', accountAddress);

	window.ethereum.on('chainChanged', chainChangedHandler);

  return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen">
      <button onClick={connectWallet} className="py-3 text-lg font-bold text-white drop-shadow-lg rounded-lg w-56 bg-blue-600 hover:bg-blue-800">{connButtonText}</button>
      <div className='flex items-center justify-center'>
				<h3>Address: {defaultAccount}</h3>
			</div>
      <div className='flex items-center justify-center'>
				<h3>Balance: {userBalance}</h3>
			</div>
      <div className='flex items-center justify-center'>
				<h3>Network name: {networkId}</h3>
			</div>
    </div>
  )
}

export default App
