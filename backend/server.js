const express = require('express');
const dotenv = require('dotenv');

const errorHandler = require('./middleware/error');

const connectDB = require('./config/db');
const path = require('path');

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
//

// Mount Routers

app.use('/api/v1/auth', auth);
app.use('/api/v1/events', events);
app.use('/api/v1/orders', orders);
app.use('/api/v1/sendmessage', sendmessage);
app.use('/api/v1/purchases', purchases);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('public/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'build', 'index.html'));
  });
}

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
