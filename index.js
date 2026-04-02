const express = require('express');
const mongoose = require('mongoose');
const app = express()
const port = 3000

app.use(express.json());

// DB connection
mongoose.connect('mongodb://127.0.0.1:27017/myapp')
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log(err));

  //Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

app.listen(port, () =>{
  console.log(`Server running on port ${port}`);
})
