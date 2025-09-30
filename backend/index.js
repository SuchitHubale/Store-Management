import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import UserRouter from './routes/user.router.js';
import itemRouter from './routes/ItemRouter.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
dotenv.config();

const PORT = process.env.PORT || 8000;
const URL = process.env.MONGOURL;

app.use('/api/v1/auth', UserRouter);
app.use('/api/v1/items', itemRouter);

app.get('/api/v1/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

app.use( (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

mongoose.connect(URL).then(() => {
    console.log("✅ Database is connected");

    app.listen(PORT, () => {
        console.log(`✅ Server running on http://localhost:${PORT}`);
        console.log(`📚 API Base URL: http://localhost:${PORT}/api/v1`);
    });
}).catch((error) => {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
});