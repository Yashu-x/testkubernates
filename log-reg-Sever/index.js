// const express = require('express');
// const dotenv = require('dotenv').config()
// const cors = require('cors')
// const {mongoose} = require('mongoose')
// const cookieParser = require('cookie-parser')

// const app = express();

// app.use(cors({
//   origin: [(process.env.ALLOWED_ORIGINS.split(',') || [])],
//   credentials: true
// }));

// //database connction
// mongoose.connect(process.env.MONGO_URL)
// .then(()=> console.log('Database connected'))
// .catch((err)=> console.log("Database not connected",err))


// app.use(express.json())
// app.use(cookieParser())
// app.use(express.urlencoded({extended :false}))

// app.use('/',require('./routes/authRoutes'))

// // app.options('*', cors());

// const PORT = parseInt(process.env.PORT || 8000);
// app.listen(PORT, () => {
//     console.log('Server Connected Successfully.');
//     console.log('Server listening on port:' + PORT);
//   });
  const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || [],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Database connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

// Routes
app.use('/', require('./routes/authRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});