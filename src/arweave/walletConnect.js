import Arweave from 'arweave';

export const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
});

// DOM Element
const arweaveWalletButton = document.getElementById('arweave-wallet');

// Global variable to hold the wallet address
let walletInstance = null;

// Function to check for arweaveWallet and connect
async function checkWalletConnection() {
  if (typeof window.arweaveWallet !== 'undefined') {
    try {
      // Request permission to access the wallet address
      await window.arweaveWallet.connect(['ACCESS_ADDRESS']);
      
      // Attempt to get the active wallet address
      walletInstance = await window.arweaveWallet.getActiveAddress();
      if (walletInstance) {
        console.log("Connected to arweaveWallet:", walletInstance);
        arweaveWalletButton.textContent = 'Wallet Connected';
        arweaveWalletButton.classList.add('connected');
      } else {
        arweaveWalletButton.textContent = 'Connection Failed';
      }
    } catch (err) {
      console.error('Failed to connect wallet:', err);
      arweaveWalletButton.textContent = 'Failed to Connect';
    }
  } else {
    console.warn('arweaveWallet extension is not found. Please install arweaveWallet.');
    arweaveWalletButton.textContent = 'Install arweaveWallet';
  }
}


if (arweaveWalletButton) {
  arweaveWalletButton.addEventListener('click', () => {
    if (!walletInstance) {
      checkWalletConnection();
    }
  });
} else {
  console.error('arweave-wallet button not found in the DOM.');
}


export async function storeData(data) {
  if (!walletInstance) {
    alert('Please connect your wallet first.');
    return;
  }

  try {
    // Create a transaction to store data on Arweave
    const transaction = await arweave.createTransaction({ data: data });
    transaction.addTag('App-Name', 'GameHighScore');
    transaction.addTag('Content-Type', 'text/plain');

    // Sign the transaction with the connected wallet
    await arweave.transactions.sign(transaction);

    // Post the transaction to Arweave
    const response = await arweave.transactions.post(transaction);
    if (response.status === 200) {
      alert('Data stored successfully on Arweave!');
    } else {
      alert('Failed to store data on Arweave');
    }
  } catch (err) {
    console.error('Error storing data on Arweave:', err);
    alert('Error storing data on Arweave');
  }
}
checkWalletConnection();