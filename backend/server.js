const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect
connectDB();

// Route files

const auth = require('./routes/auth');
const events = require('./routes/events');
const orders = require('./routes/orders');
const sendmessage = require('./routes/sendmail');
const purchases = require('./routes/purchase');

const app = express();

// Body parser
app.use(express.json());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS(Cross site scripting) attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 200,
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('public/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'build', 'index.html'));
  });
}

// Mount Routers

app.use('/api/v1/auth', auth);
app.use('/api/v1/events', events);
app.use('/api/v1/orders', orders);
app.use('/api/v1/sendmessage', sendmessage);
app.use('/api/v1/purchases', purchases);
app.use('/api/v1/reader', purchases);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}.red`);
  // close server & exit process
  server.close(() => process.exit(1));
});
