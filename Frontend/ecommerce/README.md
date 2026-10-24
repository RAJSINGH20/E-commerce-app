# E-commerce storefront

## Run locally

1. Configure the backend environment variables, including `MONGODB_URI` and `JWT_SECRET`. Start it from `Backend` with `npm install` and `npm run dev`. It listens on `http://localhost:8000` by default.
2. In `Frontend/ecommerce`, copy `.env.example` to `.env`, set `VITE_GOOGLE_CLIENT_ID`, then run `npm install` and `npm run dev`.
3. Open the local URL printed by Vite. The storefront uses `http://localhost:8000` as its API in development by default.

## Deploy the storefront to Vercel

Set the Vercel project's **Root Directory** to `Frontend/ecommerce`, then configure these environment variables in the Vercel project settings:

- `VITE_API_URL=https://e-commerce-app-mu-lemon.vercel.app`
- `VITE_GOOGLE_CLIENT_ID`: your Google OAuth web client ID

Deploy the backend as a separate Vercel project with its **Root Directory** set to `Backend`. Configure its required environment variables, including `MONGODB_URI`, `JWT_SECRET`, and the Cloudinary credentials used for product uploads. Set `FRONTEND_URL` to the storefront's exact deployed origin (for example, `https://your-store.vercel.app`) so the backend allows browser requests from that domain.

Redeploy each Vercel project after changing its environment variables. The backend root URL returns an API health response; API routes require a working MongoDB connection. The browser console's `content.js` CSP warning is from a browser extension and is unrelated to the app's API connection.
