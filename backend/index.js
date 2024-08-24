const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 5000;
const mongoDB = require('./db');

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow only your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use((req,res,next)=>{
  res.setHeader("Access-Control.Allow-Origin","http://localhose:3000")
  res.header("Access-Control-Allow",
    "Origin,X-Requested-With,Content-Type,Accept",
  );
  next();
})

app.use(express.json());


mongoDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

