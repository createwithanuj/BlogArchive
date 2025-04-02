require('dotenv').config();

const mongoURL = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

module.exports = {
    mongoURL,
    PORT
};