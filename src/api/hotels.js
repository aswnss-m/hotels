const express = require('express');
const router = express.Router();

const Hotel = require("./models/Hotel.model");
const Room  = require("./models/Room.model");

router.route("/").get((req,res)=>{
    Hotel.find().then((hotels)=>{
        res.json(hotels);
    }).catch((err)=>{
        console.log(err);
    })
}) 
router.route("/add").post((req,res)=>{
    // console.log(req.body);
    const name = req.body.hotel_name;
    const address = req.body.hotel_address;
    const phone = req.body.hotel_phone;
    const email = req.body.hotel_email;
    const website = req.body.hotel_website;
    const description = req.body.hotel_description;
    const rooms = JSON.parse(req.body.roomsData);
    const amenities = req.body.amenities;
    const nearbyAttractions = req.body.attractions;
    async function addHotel(){
        try {
            // Insert rooms into the database
            const insertedRooms = await Room.insertMany(rooms);
    
            // Extract the ObjectIds of the inserted rooms
            const roomIds = insertedRooms.map(room => room._id);
    
            // Create a new hotel with room ObjectIds
            const newHotel = new Hotel({
                name,
                address,
                phone,
                email,
                website,
                description,
                rooms: roomIds, // Assign the array of room ObjectIds
                amenities,
                nearbyAttractions
            });
    
            // Save the new hotel to the database
            await newHotel.save();
    
            console.log('Hotel and rooms created successfully');
        } catch (error) {
            console.error('Error creating hotel:', error);
        }
    }
    addHotel();
})

router.route("/blogs").get(async (req, res) => {
    try {
        // Fetch all hotels and wait for the result
        const hotels = await Hotel.find();

        let data = [];

        // Process each hotel
        for (const hotel of hotels) {
            let rooms = [];

            // Fetch rooms for the current hotel
            for (const room of hotel.rooms) {
                const roomData = await Room.findById(room);

                if (roomData) {
                    rooms.push(roomData);
                }
            }

            const template = `
                The name of the hotel is ${hotel.name}.
                The hotel is located at ${hotel.address}.
                You can contact the hotel at ${hotel.phone}.
                Send inquiries to ${hotel.email}.
                Visit the hotel website at ${hotel.website}.
                Description: ${hotel.description}.
                The rooms available are: ${rooms.map(room => room ? room.name : 'N/A').join(', ')}.
            `;

            data.push(template);
        }

        res.json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;