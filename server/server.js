import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer as createViteServer } from 'vite';

// Controllers import
import * as userController from './controllers/usersController.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: 'true' },
    appType: 'custom',
  });

  // Use vite's connect instance as middleware
  app.use(vite.middlewares);

  // API Handlers
  app.get('/api/users', userController.getAllUsers);
  app.get('/api/users/:userId', userController.getUserById);
  app.post('/api/users', express.json(), userController.addUser);

  // Serve the index.html with SSR
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template = fs.readFileSync(
        path.resolve(path.join(__dirname, '..'), 'index.html'),
        'utf-8',
      );

      template = await vite.transformIndexHtml(url, template);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(5173);
}

createServer();