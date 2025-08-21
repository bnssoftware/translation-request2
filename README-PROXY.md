# API Proxy Configuration

This Next.js application includes a built-in proxy to resolve CORS issues when your API server is running on a different port or machine.

## How it works

1. **Next.js Proxy**: The `next.config.ts` file includes a rewrite rule that proxies all requests from `/api/*` to your actual API server
2. **Client-side requests**: Your React components make requests to `/api/translation-requests` (relative URLs)
3. **Proxy forwarding**: Next.js automatically forwards these to your actual API server (e.g., `http://localhost:5000/translation-requests`)

## Configuration

### Environment Variables

Set the `API_BASE_URL` environment variable to point to your actual API server:

```bash
# .env.local
API_BASE_URL=http://localhost:5000
```

### Examples

**Different port on same machine:**
```bash
API_BASE_URL=http://localhost:8080
```

**Different machine:**
```bash
API_BASE_URL=http://192.168.1.100:5000
```

**Remote server:**
```bash
API_BASE_URL=https://api.yourdomain.com
```

## Important Notes

1. **Do not include `/api`** in the `API_BASE_URL` - the proxy handles the path mapping
2. **Keep `NEXT_PUBLIC_API_BASE_URL=/api`** - this tells the client to use relative URLs
3. **Restart the Next.js dev server** after changing environment variables
4. The proxy only works during development (`npm run dev`) and in production builds

## Troubleshooting

- Ensure your API server is running and accessible
- Check that `API_BASE_URL` points to the correct host and port
- Verify your API endpoints don't require `/api` prefix on the actual server
- Use browser dev tools to inspect network requests and see if they're being proxied correctly