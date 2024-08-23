const connectToMongo = require('./db')
connectToMongo();

//NOw express:


const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json())//let the use of req.body


// app.use('/', (req, res) => {
//     res.json({ "mesaage": "connected to server" });
// })



app.use('/api/auth', require('./routes/auth'));

app.use('/api/data', require('./routes/data'));

app.listen(port, () => {
    console.log(`Fullstack backend listening at the ${port}`);
})