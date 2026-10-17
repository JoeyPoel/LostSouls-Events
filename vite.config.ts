import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Local development API router plugin
function localApiPlugin(): Plugin {
  return {
    name: 'local-api-handler',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        const url = new URL(req.url, `http://${req.headers.host}`);
        const pathname = url.pathname;

        res.setHeader('Content-Type', 'application/json');

        // Route: /api/events
        if (pathname === '/api/events' || pathname === '/api/events/') {
          try {
            const mod = await import('./api/events/index');
            const handler = mod.default;
            const vercelReq = Object.assign(req, {
              query: Object.fromEntries(url.searchParams.entries()),
              body: null,
            });
            const vercelRes = Object.assign(res, {
              status: (code: number) => {
                res.statusCode = code;
                return vercelRes;
              },
              json: (data: unknown) => {
                res.end(JSON.stringify(data));
                return vercelRes;
              },
            });
            return await handler(vercelReq as any, vercelRes as any);
          } catch (err) {
            console.error('Error invoking /api/events:', err);
            res.statusCode = 500;
            return res.end(JSON.stringify({ error: 'Server error' }));
          }
        }

        // Route: /api/tickets/availability
        if (pathname === '/api/tickets/availability') {
          try {
            const mod = await import('./api/tickets/availability');
            const handler = mod.default;
            const vercelReq = Object.assign(req, {
              query: Object.fromEntries(url.searchParams.entries()),
              body: null,
            });
            const vercelRes = Object.assign(res, {
              status: (code: number) => {
                res.statusCode = code;
                return vercelRes;
              },
              json: (data: unknown) => {
                res.end(JSON.stringify(data));
                return vercelRes;
              },
            });
            return await handler(vercelReq as any, vercelRes as any);
          } catch (err) {
            console.error('Error invoking /api/tickets/availability:', err);
            res.statusCode = 500;
            return res.end(JSON.stringify({ error: 'Server error' }));
          }
        }

        // Route: /api/tickets/checkout
        if (pathname === '/api/tickets/checkout') {
          let bodyData = '';
          req.on('data', (chunk) => {
            bodyData += chunk;
          });
          req.on('end', async () => {
            try {
              const mod = await import('./api/tickets/checkout');
              const handler = mod.default;
              const vercelReq = Object.assign(req, {
                query: Object.fromEntries(url.searchParams.entries()),
                body: bodyData ? JSON.parse(bodyData) : {},
              });
              const vercelRes = Object.assign(res, {
                status: (code: number) => {
                  res.statusCode = code;
                  return vercelRes;
                },
                json: (data: unknown) => {
                  res.end(JSON.stringify(data));
                  return vercelRes;
                },
              });
              return await handler(vercelReq as any, vercelRes as any);
            } catch (err) {
              console.error('Error invoking /api/tickets/checkout:', err);
              res.statusCode = 500;
              return res.end(JSON.stringify({ error: 'Checkout server error' }));
            }
          });
          return;
        }

        // Route: /api/newsletter/subscribe
        if (pathname === '/api/newsletter/subscribe') {
          let bodyData = '';
          req.on('data', (chunk) => {
            bodyData += chunk;
          });
          req.on('end', async () => {
            try {
              const mod = await import('./api/newsletter/subscribe');
              const handler = mod.default;
              const vercelReq = Object.assign(req, {
                query: Object.fromEntries(url.searchParams.entries()),
                body: bodyData ? JSON.parse(bodyData) : {},
              });
              const vercelRes = Object.assign(res, {
                status: (code: number) => {
                  res.statusCode = code;
                  return vercelRes;
                },
                json: (data: unknown) => {
                  res.end(JSON.stringify(data));
                  return vercelRes;
                },
              });
              return await handler(vercelReq as any, vercelRes as any);
            } catch (err) {
              console.error('Error invoking /api/newsletter/subscribe:', err);
              res.statusCode = 500;
              return res.end(JSON.stringify({ error: 'Subscribe server error' }));
            }
          });
          return;
        }

        // Route: /api/waitlist
        if (pathname === '/api/waitlist' || pathname === '/api/waitlist/') {
          let bodyData = '';
          req.on('data', (chunk) => {
            bodyData += chunk;
          });
          req.on('end', async () => {
            try {
              const mod = await import('./api/waitlist/index');
              const handler = mod.default;
              const vercelReq = Object.assign(req, {
                query: Object.fromEntries(url.searchParams.entries()),
                body: bodyData ? JSON.parse(bodyData) : {},
              });
              const vercelRes = Object.assign(res, {
                status: (code: number) => {
                  res.statusCode = code;
                  return vercelRes;
                },
                json: (data: unknown) => {
                  res.end(JSON.stringify(data));
                  return vercelRes;
                },
              });
              return await handler(vercelReq as any, vercelRes as any);
            } catch (err) {
              console.error('Error invoking /api/waitlist:', err);
              res.statusCode = 500;
              return res.end(JSON.stringify({ error: 'Waitlist server error' }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), localApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
