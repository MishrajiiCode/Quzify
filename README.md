# Quizify AI — Smart Quiz Platform

## Development

1. Install server deps:

```bash
npm install
```

2. Install client deps and run dev server:

```bash
cd client
npm install
npm run dev
```

3. Start API server:

```bash
# from project root
node server.js
```

The React dev server runs at `http://localhost:5173/` and the API runs at `http://localhost:3000/`.

## Production build

Build the client and serve with the Express server:

```bash
# from project root
npm run start:prod
```

This will build the client into `client/dist` and start the server which serves the built SPA and API endpoints.
