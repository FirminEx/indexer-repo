import { UserOperationEvent, UserOperationEventQuery } from '../../../../types';
import db from '../../utils/db';

export async function saveUserOperationEvent(event: UserOperationEvent): Promise<void> {
  return new Promise((resolve, reject) => {
    const statement = db.prepare(`
      INSERT INTO user_operation_events (
        operationHash,
        sender,
        paymaster,
        nonce,
        success,
        actualGasCost,
        actualGasUsed
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    statement.run(
      event.operationHash,
      event.sender,
      event.paymaster,
      event.nonce.toString(),
      event.success ? 1 : 0,
      event.actualGasCost.toString(),
      event.actualGasUsed.toString(),
      (err: Error | null) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      },
    );

    statement.finalize();
  });
}

export async function getUserOperationEvents(query: UserOperationEventQuery): Promise<UserOperationEvent[]> {
  return new Promise((resolve, reject) => {
    const conditions: string[] = [];
    const params: any[] = [];

    if (query.operationHash) {
      conditions.push('operationHash = ?');
      params.push(query.operationHash);
    }

    if (query.sender) {
      conditions.push('sender = ?');
      params.push(query.sender);
    }

    if (query.paymaster) {
      conditions.push('paymaster = ?');
      params.push(query.paymaster);
    }

    if (query.success !== undefined) {
      conditions.push('success = ?');
      params.push(query.success);
    }

    let sql = `
      SELECT 
        operationHash,
        sender,
        paymaster,
        nonce,
        success,
        actualGasCost,
        actualGasUsed,
        createdAt
      FROM user_operation_events
      ${conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : ''}
      ORDER BY createdAt DESC
    `;

    db.all(sql, params, (err, rows: UserOperationEvent[]) => {
      if (err) {
        reject(err);
        return;
      }
    
      const events: UserOperationEvent[] = rows.map((row) => ({
        operationHash: row.operationHash,
        sender: row.sender,
        paymaster: row.paymaster,
        nonce: BigInt(row.nonce),
        success: row.success,
        actualGasCost: BigInt(row.actualGasCost ?? 0),
        actualGasUsed: BigInt(row.actualGasUsed ?? 0),
        createdAt: row.createdAt,
      }));

      resolve(events);
    });
  });
}
