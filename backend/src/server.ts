import dotenv from 'dotenv';
import app from './app.js';
import { connectDatabase } from './config/database.js';

dotenv.config();

const port = Number(process.env.PORT );
const mongoUri = process.env.MONGODB_URI ;

async function bootstrap() {
  await connectDatabase(mongoUri);

  app.listen(port, () => {
    console.info(`[server] Listening on http://localhost:${port}`);
  });
}

bootstrap().catch((error) => {
  console.error('[server] Failed to start', error);
  process.exit(1);
});

