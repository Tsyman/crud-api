import http from 'node:http';
import 'dotenv/config';
import { routes } from './controllers/routes';

const PORT = process.env.PORT || 4000;

const server = http.createServer(routes);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});