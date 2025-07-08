import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler.js';
     
// Import routes
import userRoutes from './routes/userRoutes.js';
import ecoLoopRoutes from './routes/ecoLoopRoutes.js';
import productRoutes from './routes/productRoutes.js';
import greenScoreRoutes from './routes/greenScoreRoutes.js';
import privacyRoutes from './routes/privacyRoutes.js';
import rewardsRoutes from './routes/rewardsRoutes.js';

config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(json());
app.use(morgan('dev'));

// Connect to MongoDB
connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));


// Use routes
app.use('/api/users', userRoutes);
app.use('/api/ecoloop', ecoLoopRoutes);
app.use('/api/products', productRoutes); 
app.use('/api/greenscore', greenScoreRoutes);
app.use('/api/privacy', privacyRoutes);
app.use('/api/rewards', rewardsRoutes);
app.use(errorHandler);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
