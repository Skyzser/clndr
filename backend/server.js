require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
const db = require('./database');

const app = express();
const port = process.env.PORT || 8000;
db();


app.use(express.json());  // No need for body-parser.json as it is included in express.json()
app.use(express.urlencoded({ extended: false }));
app.use(cors());


// ==================== ROUTES ====================
app.use('/api/events', require('./routes/eventRoute'));
app.use('/api/users', require('./routes/userRoute'));
app.use('*', (req, res) => res.status(404).send("404. Page Not Found"));
app.use(errorHandler);  // override default error handler


app.listen(port, () => {
	console.log(`Server runnning on: http://localhost:${port}`);
});