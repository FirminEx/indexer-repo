import { Alchemy, Network } from 'alchemy-sdk';

// Configuration for connecting to Alchemy
const config = {
  apiKey: process.env.ALCHEMY_API_KEY, // Your API key from Alchemy
  network: Network.ETH_SEPOLIA, // Using Sepolia testnet
};

// Create an Alchemy instance
const alchemy = new Alchemy(config);

export default alchemy;
