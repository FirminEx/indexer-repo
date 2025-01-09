export type UserOperationEvent = {
  operationHash: string;
  sender: string;
  paymaster: string;
  nonce: bigint;
  success: number;
  actualGasCost: bigint;
  actualGasUsed: bigint;
  createdAt: string;
};

export type UserOperationEventQuery = {
  operationHash?: string;
  sender?: string;
  paymaster?: string;
  fromBlock?: number;
  toBlock?: number;
  success?: number;
};
