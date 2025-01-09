import { EventLog } from 'ethers';
import { UserOperationEvent, UserOperationEventQuery } from '../../../../types';
import { entryPoint } from '../../utils/provider';

export async function getUserOperationEventsSinceBlock(fromBlock: number): Promise<UserOperationEvent[]> {
  const events = (await entryPoint.queryFilter(
    entryPoint.filters.UserOperationEvent(),
    fromBlock,
    'latest',
  )) as EventLog[];

  const userOpEvents: UserOperationEvent[] = events.map((event) => ({
    operationHash: event.args!.userOpHash,
    sender: event.args!.sender,
    paymaster: event.args!.paymaster,
    nonce: event.args!.nonce,
    success: event.args!.success,
    actualGasCost: event.args!.actualGasCost,
    actualGasUsed: event.args!.actualGasUsed,
  }));

  return userOpEvents;
}

export function getUserOperationEvents(query: UserOperationEventQuery) {
  return getUserOperationEvents(query);
}
