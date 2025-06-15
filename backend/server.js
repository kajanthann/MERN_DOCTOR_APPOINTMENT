import expess from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/DB.js';
import adminRouter from './routes/adminRoute.js';


// app config
const app = expess();
const port = process.env.PORT || 8000;
connectDB();

// middeleware
app.use(cors());
app.use(expess.json());

// api endpoint
app.use('/api/admin',adminRouter);

app.listen(port, () => {
    console.log("server started", port);
})