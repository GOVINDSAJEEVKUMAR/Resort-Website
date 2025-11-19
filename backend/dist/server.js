import dotenv from 'dotenv';
import app from './app.js';
import { connectDatabase } from './config/database.js';
dotenv.config();
const port = Number(process.env.PORT ?? 5000);
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/resort_booking';
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
//# sourceMappingURL=server.js.map