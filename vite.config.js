import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { Buffer } from 'node:buffer';
import process from 'node:process';
import visitorsHandler from './api/visitors.js';
import aiHandler from './api/ai.js';

async function readRequestBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  const body = Buffer.concat(chunks).toString('utf8');
  try { return JSON.parse(body); } catch { return body; }
}

function prepareApiResponse(response) {
  response.status = (statusCode) => {
    response.statusCode = statusCode;
    return response;
  };
  response.json = (payload) => {
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.end(JSON.stringify(payload));
    return response;
  };
}

function localVisitorsApi() {
  return {
    name: 'kdm-local-visitors-api',
    configureServer(server) {
      server.middlewares.use('/api/visitors', async (request, response) => {
        if (request.method === 'POST') {
          request.body = await readRequestBody(request);
        }
        prepareApiResponse(response);
        await visitorsHandler(request, response);
      });
    },
  };
}

function localAiApi() {
  return {
    name: 'kdm-local-ai-api',
    configureServer(server) {
      server.middlewares.use('/api/ai', async (request, response) => {
        if (request.method === 'POST') request.body = await readRequestBody(request);
        prepareApiResponse(response);
        await aiHandler(request, response);
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const serverEnvironment = loadEnv(mode, process.cwd(), ['MONGODB_URI', 'GROQ_']);
  if (!process.env.MONGODB_URI && serverEnvironment.MONGODB_URI) {
    process.env.MONGODB_URI = serverEnvironment.MONGODB_URI;
  }
  if (!process.env.GROQ_API_KEY && serverEnvironment.GROQ_API_KEY) {
    process.env.GROQ_API_KEY = serverEnvironment.GROQ_API_KEY;
  }
  if (!process.env.GROQ_MODEL && serverEnvironment.GROQ_MODEL) {
    process.env.GROQ_MODEL = serverEnvironment.GROQ_MODEL;
  }

  return {
    base: '/',
    plugins: [localVisitorsApi(), localAiApi(), react(), tailwindcss()],
    build: { outDir: 'dist' },
  };
});
