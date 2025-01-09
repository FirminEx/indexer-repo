import { ethers } from 'ethers';

// EntryPoint contract details
const ENTRY_POINT_ADDRESS = '0x0000000071727de22e5e9d8baf0edac6f37da032';
const USER_OPERATION_EVENT_TOPIC = '0x49628fd1471006c1482da88028e9ce4dbb080b815c9b0344d39e5a8e6ec1419f';

export const provider = new ethers.JsonRpcProvider(
  'https://eth-sepolia.g.alchemy.com/v2/Wr6Tvk0lVFSbJfE9ex7adjiVSfsLOMy7',
);

export const entryPoint = new ethers.Contract(
  ENTRY_POINT_ADDRESS,
  [
    'event UserOperationEvent(bytes32 indexed userOpHash, address indexed sender, address indexed paymaster, uint256 nonce, bool success, uint256 actualGasCost, uint256 actualGasUsed)',
  ],
  provider,
);
