// Lightweight smoke test: try to GET the site on common dev ports and expect a 200+ response
// This test is intentionally tolerant of the dev server choosing an available port (3000/3001/etc.)
const fetch = global.fetch || require('node-fetch');

const portsToTry = [3000, 3001, 3002, 3003];

async function tryPorts() {
  const paths = ['/', '/en', '/_next/static'];
  for (const port of portsToTry) {
    for (const path of paths) {
      const url = `http://localhost:${port}${path}`;
      try {
        const res = await fetch(url, { method: 'GET' });
        if (res && res.status && res.status >= 200 && res.status < 500) {
          return { port, status: res.status, url };
        }
      } catch (err) {
        // ignore and try next
      }
    }
  }
  throw new Error(`No reachable dev server found on ports ${portsToTry.join(', ')}`);
}

test('dev server responds on at least one common port', async () => {
  const info = await tryPorts();
  expect(info).toBeDefined();
  expect(info.status).toBeGreaterThanOrEqual(200);
});
