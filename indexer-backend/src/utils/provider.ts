import { ethers } from 'ethers';

// EntryPoint contract details
const ENTRY_POINT_ADDRESS = '0x0000000071727de22e5e9d8baf0edac6f37da032';

export const provider = new ethers.JsonRpcProvider(
  process.env.PROVIDER_URL,
);

export const entryPoint = new ethers.Contract(
  ENTRY_POINT_ADDRESS,
  [
    'event UserOperationEvent(bytes32 indexed userOpHash, address indexed sender, address indexed paymaster, uint256 nonce, bool success, uint256 actualGasCost, uint256 actualGasUsed)',
  ],
  provider,
);
