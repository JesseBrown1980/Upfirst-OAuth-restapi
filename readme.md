# OAuth 2.0 Authorization Server

A TypeScript implementation of an OAuth 2.0 authorization server following the RFC 6749 specification.

## Features

- Authorization endpoint (`/api/oauth/authorize`) supporting:

  - Authorization code grant type
  - State parameter for CSRF protection
  - Client validation
  - Redirect URI validation

- Token endpoint (`/api/oauth/token`) supporting:
  - Authorization code exchange for access tokens
  - Refresh token grant type
  - JWT access tokens
  - Client validation

## Getting Started

### Prerequisites

- Node.js 14+
- npm

### Installation

1. Clone the repository
2. Install dependencies

   ```bash
   npm install
   ```

3. Start the server
   ```bash
   npm start
   ```

The server will start on http://localhost:8080.
