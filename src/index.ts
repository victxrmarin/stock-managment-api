import  express  from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/products.routes'

dotenv.config()

const app = express()


app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({status: 'Stock API Online'})
})

app.use('/products', productRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Server running!')
})