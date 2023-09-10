const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path'); 
const bodyParser = require('body-parser');
app.use(cors());

const hotels = require('./api/hotels');

// Read hotel data using the function from hotels.js
const staticPath = path.join(__dirname, 'src', 'pages');
app.use(express.static(staticPath));
app.use(bodyParser.urlencoded({ extended: false }));

// Your existing routes

// Handle the '/form' route explicitly
app.get('/form', (req, res) => {
  res.sendFile(path.join(staticPath, 'form.html'));
});
app.get('/', (req, res) => {
    const hotelData = hotels.readHotelData();
    res.send(hotelData);
    }
);
app.get('/blog',(req,res)=>{
    res.send('Hello World')
})
app.post('/submit-hotel-details', (req, res) => {
    // Access the form data from req.body
    const { hotel_name, hotel_location, built_year, /* Add more fields as needed */ } = req.body;
  
    // Process the form data, save it to a database, or perform other actions
    // For demonstration purposes, we'll just send a response back with the collected data
    const hotelDetails = {
      hotel_name,
      hotel_location,
      built_year,
      // Add more fields as needed
    };
  
    res.json({ message: 'Hotel details submitted successfully', data: hotelDetails });
  });
  

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
    }
);

