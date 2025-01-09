# User Operations Indexer

A web application for indexing and monitoring user operations, consisting of a Node.js backend and Angular frontend.

## Project Structure

- `indexer-backend/`: Node.js backend server
- `indexer-frontend/`: Angular frontend application

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Angular CLI

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd indexer-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with required environment variables:
   ```
   PROVIDER_URL=
   ```

4. Start the backend server:
   ```bash
   npm run start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd indexer-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

The application will be available at `http://localhost:4200` and will connect to the backend at `http://localhost:3000`.

## Features

- User operations monitoring
- Real-time event tracking
- Data persistence using SQLite

## Development

- Backend: Node.js with Express
- Frontend: Angular
- Database: SQLite for data storage

