import mongoose from 'mongoose';
export async function connectDatabase(uri) {
    try {
        await mongoose.connect(uri);
        console.info('[database] Connected');
    }
    catch (error) {
        console.error('[database] Connection failed', error);
        throw error;
    }
}
//# sourceMappingURL=database.js.map