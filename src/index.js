import express from 'express'
import dotenv from 'dotenv'
// import {authRoutes} from "./routes/index.js"

dotenv.config()
const PORT = process.env.PORT || 3000;

const app = express()
app.use(express.json())

// app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {res.send("Hello, World!")})

app.listen(PORT, () => {console.log(`Servidor rodando na porta ${PORT}`)})