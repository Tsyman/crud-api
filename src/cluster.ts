import cluster from 'node:cluster';
import { availableParallelism } from 'node:os';
import http from 'node:http';
import { URL } from 'node:url';
import { routes } from './controllers/routes';
import 'dotenv/config';

const numCPUs = availableParallelism();
const START_PORT = Number(process.env.PORT) || 4000;

let currentPortIndex = 0;

if (cluster.isPrimary) {

  for (let cpuIndex = 0; cpuIndex < numCPUs; cpuIndex++) {
    cluster.fork();
  }

  cluster.on('exit', () => {
    console.log('Worker died');
    cluster.fork();
  });

  const proxyServer = http.createServer((req, res) => {
    const nextAvailablePort = getNextAvailablePort(START_PORT);
    console.log(`Routing request to port ${nextAvailablePort}`);
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;
    const options = {
      ...url,
      pathname,
      port: nextAvailablePort,
      headers: req.headers,
      method: req.method,
    };

    req.pipe(
      http.request(options, (response) => {
        console.log(`Received response from port ${nextAvailablePort}`);
        res.writeHead(response.statusCode, response.headers);
        response.pipe(res);
      }),
    );
  });

  proxyServer.listen(START_PORT, () => {
    console.log(`Load balancer created on PORT ${START_PORT}`)
  });

} else {
  const workerPort = START_PORT + cluster.worker.id;
  const server = http.createServer(routes);
  server.listen(workerPort, () => {
    console.log(`Worker listening on port ${workerPort}`)
  });
}

const getNextAvailablePort = (startPort: number): number => {
  currentPortIndex = currentPortIndex === numCPUs ? 1 : currentPortIndex + 1;
  return currentPortIndex + startPort;
};
