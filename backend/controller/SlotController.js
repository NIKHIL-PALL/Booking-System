
const Availability = require('../model/Availability');

const getSlotsByUserId = async(req, res) => {
    const {userId}  = req.params;
    try{
        const slots = await Availability.findOne({userId});
        if(!slots) {
            return res.status(404).json({message : "No slots are available"});
        }
        else{
            return res.status(200).json(slots);
        }
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({message : error.message});
    }
}

const createSlot = async(req, res) => {
    const {userId, day, slots} = req.body;
    try{

        const existingSlots = await Availability.findOne({userId, day});
        if(!existingSlots) {
            const newAvailability = new Availability({userId, day, slots});
            await newAvailability.save();
        }
        else{
            existingSlots.slots.push(...slots);
            await existingSlots.save();
        }
        return res.status(201).json({message : "Succesfully created slot"});
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({message : "Internal Server error"});
    }

}

const updateSlotTime = async (req, res) => {
    const {userId,index, newStart, newEnd} = req.body;
    try{
        const availability = await Availability.findOne({userId});
        if(!availability) {
            return res.status(404).json({message : "Invalid userId"});
        }
        else{
            availability.slots[index].start = newStart;
            availability.slots[index].end = newEnd;
            await availability.save();
        }
        return res.status(200).json({message : "Successfully updated"});
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({message : error.message});
    }
}

const deleteSlotByIndex = async(req, res) => {
    const {userId, index} = req.params;

    try{
        const slotIndex = parseInt(index);
        
        const availableSlots = await Availability.findOne({userId});
        if(slotIndex < 0 || slotIndex >= availableSlots.slots.length) {
            return res.status(409).json({message : "Invalid Slot Index"});
        }
        if(!availableSlots) {
            return res.status(404).json({message : "Slot not found"});
        }
        else{
            availableSlots.slots = availableSlots.slots.filter((slot, ind) => ind !== slotIndex);
            await availableSlots.save();
            console.log(availableSlots.slots)
        }
        return res.status(200).json({message : "Succesfully deleted slot."});
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({message : error.message});
    }

}


module.exports = {
    createSlot,
    updateSlotTime,
    getSlotsByUserId,
    deleteSlotByIndex
}
