const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const hotels = require('./api/hotels');

// Read hotel data using the function from hotels.js

app.get('/', (req, res) => {
    const hotelData = hotels.readHotelData();
    res.send(hotelData);
    }
);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
    }
);

