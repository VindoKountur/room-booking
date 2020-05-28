const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

const middlewares = require('./middlewares');

app.use('/api', require('./routers'));

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`http://localhost:${port}`));
