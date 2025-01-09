import sqlite3 from 'sqlite3';

// Create a SQLite database file in the project root
const db = new sqlite3.Database('./user_operations.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Initialize the database with the required table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS user_operation_events (
      operationHash TEXT PRIMARY KEY,
      sender TEXT NOT NULL,
      paymaster TEXT NOT NULL,
      nonce TEXT NOT NULL,
      success INTEGER NOT NULL,
      actualGasCost TEXT NOT NULL,
      actualGasUsed TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// Export the database instance for potential direct usage
export default db;
