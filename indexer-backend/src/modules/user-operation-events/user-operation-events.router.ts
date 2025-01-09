import { Router } from 'express';
import { z } from 'zod';
import { UserOperationEventQuery } from '../../../../types';
import { cache, CACHE_KEYS, getCacheKey } from '../../utils/cache';
import { getUserOperationEvents } from './user-operation-events.repository';
import logger from '../../utils/logging';


const router = Router();

const userOperationEventQuerySchema = z.object({
  operationHash: z.string().optional(),
  sender: z.string().optional(),
  paymaster: z.string().optional(),
  fromBlock: z.coerce.number().int().positive().optional(),
  toBlock: z.coerce.number().int().positive().optional(),
  success: z.preprocess(
    (val) => (val === undefined ? undefined : Number(val)),
    z.union([z.literal(0), z.literal(1)]).optional()
  ),
});

router.get('/', async (req: any, res: any) => {
  try {
    const validationResult = userOperationEventQuerySchema.safeParse(req.query);

    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Invalid query parameters',
        details: validationResult.error.issues,
      });
    }

    const query: UserOperationEventQuery = validationResult.data;
    // Generate cache key based on query parameters
    const cacheKey = getCacheKey(CACHE_KEYS.USER_OPERATION_EVENTS, query);

    // Try to get data from cache
    const cachedEvents = cache.get(cacheKey);
    if (cachedEvents) {
      logger.info(`Cache hit for ${cacheKey}`);
      return res.json(cachedEvents);
    }
    logger.info(`Cache miss for ${cacheKey}`);

    const events = await getUserOperationEvents(query);

    const cleanedEvents = events.map(({ actualGasCost, actualGasUsed, nonce, ...event }) => ({
      ...event,
      actualGasCost: actualGasCost.toString(),
      actualGasUsed: actualGasUsed.toString(),
      nonce: nonce.toString(),
    }));
    cache.set(cacheKey, cleanedEvents);

    return res.json(cleanedEvents);
  } catch (error) {
    console.error('Error fetching user operation events:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
