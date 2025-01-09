import { EventLog } from 'ethers';
import { UserOperationEvent } from '../../../types';
import { saveUserOperationEvent } from '../modules/user-operation-events/user-operation-events.repository';
import { cache, CACHE_KEYS } from './cache';
import { entryPoint } from './provider';

export async function listenToUserOperationEvents() {
  entryPoint.on(
    'UserOperationEvent',
    async (operationHash, sender, paymaster, nonce, success, actualGasCost, actualGasUsed) => {
      const newEvent: UserOperationEvent = {
        operationHash,
        sender,
        paymaster,
        nonce,
        success,
        actualGasCost,
        actualGasUsed,
      };

      // Add new event to array and save to database
      try {
        await saveUserOperationEvent(newEvent);
        console.log('New UserOperation event saved:', newEvent);
        cache.del(CACHE_KEYS.USER_OPERATION_EVENTS + ':{}'); // Clear the cache for default query
      } catch (error) {
        console.error('Error saving UserOperation event:', error);
      }
    },
  );

  // Get the last event
  const lastEvent = await entryPoint.queryFilter(
    entryPoint.filters.UserOperationEvent(),
    -1, // Last block
  );

  if (lastEvent.length > 0) {
    const event = lastEvent[0] as EventLog;

    const newEvent: UserOperationEvent = {
      operationHash: event.args!.userOpHash,
      sender: event.args!.sender,
      paymaster: event.args!.paymaster,
      nonce: event.args!.nonce,
      success: event.args!.success,
      actualGasCost: event.args!.actualGasCost,
      actualGasUsed: event.args!.actualGasUsed,
    };

    try {
      await saveUserOperationEvent(newEvent);
      console.log('Last UserOperation event saved:', newEvent);
      cache.del(CACHE_KEYS.USER_OPERATION_EVENTS + ':{}'); // Clear the cache for default query
    } catch (error) {
      console.error('Error saving last UserOperation event:', error);
    }
  }
}
