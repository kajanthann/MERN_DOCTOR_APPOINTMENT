import expess from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/DB.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';


// app config
const app = expess();
const port = process.env.PORT || 8000;
connectDB();

// middeleware
app.use(cors());
app.use(expess.json());

// api endpoint
app.use('/api/admin',adminRouter);
app.use('/uploads', expess.static('uploads'));
app.use('/api/doctor',doctorRouter)

app.listen(port, () => {
    console.log("server started", port);
})