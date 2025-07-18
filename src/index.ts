import  {Request, Response}  from "express";
import  express  from "express"
import cors from 'cors';
import helmet from 'helmet'
import dotenv from 'dotenv';
import productRoutes from './routes/products.routes'
import userRoutes from './routes/user.routes'

dotenv.config()
const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())

app.get('/', (req : Request, res : Response) => {
    res.json({status: 'Stock API Online'})
})

app.use('/products', productRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log('Server running!')
})

