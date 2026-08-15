import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { Buffer } from 'node:buffer';
import process from 'node:process';
import visitorsHandler from './api/visitors.js';

function localVisitorsApi() {
  return {
    name: 'kdm-local-visitors-api',
    configureServer(server) {
      server.middlewares.use('/api/visitors', async (request, response) => {
        if (request.method === 'POST') {
          const chunks = [];
          for await (const chunk of request) chunks.push(chunk);
          const body = Buffer.concat(chunks).toString('utf8');
          try { request.body = JSON.parse(body); } catch { request.body = body; }
        }

        response.status = (statusCode) => {
          response.statusCode = statusCode;
          return response;
        };
        response.json = (payload) => {
          response.setHeader('Content-Type', 'application/json; charset=utf-8');
          response.end(JSON.stringify(payload));
          return response;
        };
        await visitorsHandler(request, response);
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const serverEnvironment = loadEnv(mode, process.cwd(), 'MONGODB_URI');
  if (!process.env.MONGODB_URI && serverEnvironment.MONGODB_URI) {
    process.env.MONGODB_URI = serverEnvironment.MONGODB_URI;
  }

  return {
    base: '/',
    plugins: [localVisitorsApi(), react(), tailwindcss()],
    build: { outDir: 'dist' },
  };
});
