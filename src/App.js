import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import PasswordManager from './artifacts/contracts/PasswordManager.sol/PasswordManager.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Enter the deployed contract address here

export default function App() {
  const [password, setPassword] = useState('');
  const [savedPassword, setSavedPassword] = useState('');

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert('Please install MetaMask!');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      console.log('Connected', accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const savePassword = async () => {
    if (!password) return;

    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, PasswordManager.abi, signer);

      const transaction = await contract.savePassword(password);
      await transaction.wait();
      console.log('Password saved');
    }
  };

  const retrievePassword = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, PasswordManager.abi, signer);

      const data = await contract.getPassword();
      setSavedPassword(data);
      console.log('Password retrieved');
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <button onClick={savePassword}>Save Password</button>
        <button onClick={retrievePassword}>Retrieve Password</button>
      </header>
      <div>Saved Password: {savedPassword}</div>
    </div>
  );
}
