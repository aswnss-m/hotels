const fs = require('fs');
const path = require('path');

// Define the path to the JSON file
const jsonFilePath = path.join(__dirname, '..', 'src/data', 'fourpoints.json');

// Function to read the JSON data
function readHotelData() {
  try {
    // Read the JSON file and parse its contents
    const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
    const hotelData = JSON.parse(jsonData);
    return hotelData;
  } catch (error) {
    console.error('Error reading hotel data:', error);
    return null;
  }
}

// Export the function to be used in other modules
module.exports = {
  readHotelData,
};